/* eslint-disable @next/next/no-img-element */
import { AppDispatch, RootState} from "@/lib/reducers/store";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { useDispatch, useSelector} from "react-redux";
import "../../../styles/components/fullscreen_components/fullscreen-display.scss"
import setFullScreenAction from "@/lib/reducers/utilitisesReducer/actions/setFullScreenAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ImageUrl } from "@/lib/tools/stringTools";
import useWindowSize from "@/lib/tools/useWindowSize";
import LoadingComponent from "../small_components/LoadingComponent";

const MIN_SCALE = 0; // unused but safe
const MAX_SCALE = 6;
const BORDER = 2;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const miniWidth = 160;

const FullScreenImage: FC  = () => {
    // Reducer
    const { currentImage } = useSelector(
        (store: RootState) => store.auth
    )
    const dispatch: AppDispatch = useDispatch()

    // Use Window Size
    const { width: winW, height: winH } = useWindowSize();

    // Refs
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const hideMiniMapTimer = useRef<NodeJS.Timeout | null>(null);
    const dragRef = useRef<boolean>(false);
    const suppressDragRef = useRef(false);

    // States
    const [scale, setScale] = useState<number>(1);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [drag, setDrag] = useState<boolean>(false);
    const [last, setLast] = useState({ x: 0, y: 0 });
    const [showMiniMap, setShowMiniMap] = useState<boolean>(false);
    const [ready, setReady] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [decoded, setDecoded] = useState<boolean>(false);
    const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
    const [minimapClass, setminimapClass] = useState<string>("hidden");
    const [miniMapFirstShow, setminiMapFirstShow] = useState<boolean>(false);

    // -------------------------
    // Utilities
    // -------------------------

    const miniRatio = imgRef.current  ? miniWidth / imgRef.current.naturalWidth : 0.1;

    const showMini = () => {
        setShowMiniMap(true);
        if (hideMiniMapTimer.current) clearTimeout(hideMiniMapTimer.current);
            hideMiniMapTimer.current = setTimeout(() => {
                setShowMiniMap(false);
            }, 750);
    };

    const centerImage = (
        imgW: number,
        imgH: number,
        scale: number,
        winW: number,
        winH: number
    ) => ({
        x: (winW - imgW * scale) / 2,
        y: (winH - imgH * scale) / 2,
    });

    const clampToBounds = (
        x: number,
        y: number,
        scale: number,
        imgW: number,
        imgH: number,
        winW: number,
        winH: number
    ) => {
        const iw = imgW * scale;
        const ih = imgH * scale;

        let nx = x;
        let ny = y;

        // axe X
        if (iw <= winW) {
            nx = (winW - iw) / 2; // locked center
        } else {
            const minX = winW - iw;
            const maxX = 0;
            nx = clamp(x, minX, maxX);
        }

        // axe Y
        if (ih <= winH) {
            ny = (winH - ih) / 2; // locked center
        } else {
            const minY = winH - ih;
            const maxY = 0;
            ny = clamp(y, minY, maxY);
        }

        return { x: nx, y: ny };
    };

    const initImage = () => {
        if (!imgRef.current || !winW || !winH) return;

        const { naturalWidth: w, naturalHeight: h } = imgRef.current;
        if (!w || !h) return;

        const fit = getFitScale(w, h, winW, winH);
        const centered = centerImage(w, h, fit, winW, winH);

        setScale(fit);
        setPos(centered);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setReady(true);
            });
        });
    };

    // Use Effect to controll MiniMap visibility
    useEffect(()=>{
        if (showMiniMap){
            setminimapClass("show")
            setminiMapFirstShow(true)
        }
        else if (miniMapFirstShow) {
            setminimapClass("hide")
        }
    },[miniMapFirstShow, showMiniMap])

    // -------------------------
    // Resize
    // -------------------------

    useEffect(() => {
        if (!ready || !imgRef.current) return;

        const { naturalWidth: w, naturalHeight: h } = imgRef.current;
        const fit = getFitScale(w, h, winW, winH);

        setScale(prev => Math.max(prev, fit));

        setPos(prev =>
            clampToBounds(prev.x, prev.y, Math.max(scale, fit), w, h, winW, winH)
        );
    }, [winW, winH, ready]);

    // -------------------------
    // Apply Zoom
    // -------------------------

    const applyZoom = (newScale: number, cx: number, cy: number) => {
        if (!imgRef.current) return;

        const { naturalWidth: w, naturalHeight: h } = imgRef.current;
        const fit = getFitScale(w, h, winW, winH);

        newScale = clamp(newScale, fit, MAX_SCALE);

        const ratio = newScale / scale;

        const nx = cx - (cx - pos.x) * ratio;
        const ny = cy - (cy - pos.y) * ratio;

        const next = clampToBounds(nx, ny, newScale, w, h, winW, winH);

        setScale(newScale);
        setPos(next);
        showMini();
    };

    const getFitScale = (
        imgW: number,
        imgH: number,
        winW: number,
        winH: number
    ) => Math.min(winW / imgW, winH / imgH);

    // -------------------------
    // Wheel zoom
    // -------------------------

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;

        const zoom = e.deltaY < 0 ? 1.15 : 0.85;
        const newScale = scale * zoom;

        applyZoom(newScale, cx, cy);
    };

    // -------------------------
    // Double click zoom center
    // -------------------------

    const handleDoubleClick = () => {
        suppressDragRef.current = true;

        dragRef.current = false;
        setDrag(false);

        setTimeout(() => {
            suppressDragRef.current = false;
        }, 0);

        if (!imgRef.current || !containerRef.current) return;

        const { naturalWidth: w, naturalHeight: h } = imgRef.current;
        const fit = getFitScale(w, h, winW, winH);

        const cx = winW / 2;
        const cy = winH / 2;

        const newScale = scale === fit ? fit * 2 : fit;

        applyZoom(newScale, cx, cy);
    };

    // -------------------------
    // Drag
    // -------------------------

    const handleDown = (e: React.MouseEvent) => {
        if (suppressDragRef.current) return;

        dragRef.current = true;
        setDrag(true);
        setLast({ x: e.clientX, y: e.clientY });
    };

    const handleMove = (e: React.MouseEvent) => {
       if (!dragRef.current || !imgRef.current) return;

        const { naturalWidth: imgW, naturalHeight: imgH } = imgRef.current;

        if (imgW * scale <= winW && imgH * scale <= winH) return;

        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;

        const next = clampToBounds(
            pos.x + dx,
            pos.y + dy,
            scale,
            imgW,
            imgH,
            winW,
            winH
        );

        setPos(next);
        setLast({ x: e.clientX, y: e.clientY });
        showMini();
    };

    const handleUp = () => {
        dragRef.current = false;
        setDrag(false);
    };

    // -------------------------
    // Pinch zoom mobile
    // -------------------------

    const pinch = useRef<{ dist: number; scale: number } | null>(null);

    const touchMove = (e: React.TouchEvent) => {
        if (e.touches.length !== 2 || !containerRef.current) return;

        const a = e.touches[0];
        const b = e.touches[1];
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);

        if (!pinch.current) {
            pinch.current = { dist, scale };
            return;
        }

        const ratio = dist / pinch.current.dist;
        const newScale = pinch.current.scale * ratio;

        const rect = containerRef.current.getBoundingClientRect();
        const cx = (a.clientX + b.clientX) / 2 - rect.left;
        const cy = (a.clientY + b.clientY) / 2 - rect.top;

        applyZoom(newScale, cx, cy);
    };

    const touchEnd = () => (pinch.current = null);

    // -------------------------
    // Reset
    // -------------------------

    const reset = () => {
        if (!imgRef.current) return;

        const { naturalWidth: w, naturalHeight: h } = imgRef.current;
        const fit = getFitScale(w, h, winW, winH);

        setScale(fit);
        setPos(centerImage(w, h, fit, winW, winH));
    };

    // -------------------------
    // Render
    // -------------------------

    return ( 
        <>
            <div
                ref={containerRef}
                className="viewer"
                onClick={()=>dispatch(setFullScreenAction(""))}
                onWheel={handleWheel}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleDown}
                onMouseMove={handleMove}
                onMouseUp={handleUp}
                onMouseLeave={handleUp}
                onTouchMove={touchMove}
                onTouchEnd={touchEnd}
            >   
                {!loaded && <LoadingComponent type="black-hole" size={200}/>}
                <div
                    className="image-layer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: imgSize.w,
                        height: imgSize.h,
                        opacity: ready && imgSize.w > 0 ? 1 : 0,
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                        transition: !ready || drag ? "none" : "transform 0.25s ease-out, opacity 0.4s",
                        transformOrigin: "0 0",
                    }}
                >    
                    <img
                        ref={imgRef}
                        src={ImageUrl(currentImage.url, "full", "image")}
                        alt={`${currentImage.title} by ${currentImage.author}`}
                        draggable={false}
                        onLoad={async (e) => {
                            const img = e.currentTarget;
                            try { await img.decode(); } catch {}
                            setImgSize({
                                w: img.naturalWidth,
                                h: img.naturalHeight
                            });
                            setDecoded(true);
                            initImage();
                            setLoaded(true);
                        }}
                        className={`full ${decoded ? "show" : ""}`}
                    />
                </div>
                <button 
                    className="reset button-simple"
                    onClick={(e) => {
                        e.stopPropagation()
                        reset()
                    }}
                >
                    Reset Zoom
                </button>
                    <div 
                        className={`minimap ${minimapClass}`}
                    >
                        <img src={ImageUrl(currentImage.url, "thumbnail", "image", 750)} alt="" />
                        <div
                            className="mini-viewport"
                            style={{
                                left: `${(-pos.x / scale) * miniRatio - BORDER}px`,
                                top: `${(-pos.y / scale) * miniRatio - BORDER}px`,
                                width: `${(winW / scale) * miniRatio }px`,
                                height: `${(winH / scale) * miniRatio }px`
                            }}
                        />
                    </div>
            </div>
            <button className="full-screen-xmark"
                onClick={()=>dispatch(setFullScreenAction(""))}
                onKeyDown={()=>dispatch(setFullScreenAction(""))}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </>
    )
}

export default FullScreenImage

