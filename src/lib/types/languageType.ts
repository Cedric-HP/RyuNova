type LanguageData = {
  titles: LanguageTitles,
  contentType: LanguageContentType,
  button: LanguageButton,
  date: LanguageDate,
  placeHolders: LanguagePlaceHolder,
  alt: LanguageAlt,
  message: LanguageMessage,
  utilities: LanguageUtilities, 
}
type SingulaPlural = {
  singular: string,
  plural: string,
}

type LanguageTitles = {
  homeMainTitle: string,
  homeSecondTitle: string,
  featuredPicturesGallery: string,
  featuredArticles: string,
  upcommingAstronomicalEvents: string,
  home: string,
  gallery: string,
  events: string,
  content: string,
  legalInformation: string,
  termsOfService: string,
  privacyPolicy: string,
  copyrightNotification: string,
  intellectualPropertyRights: string,
  imageUpload: LanguageImageUpload
}

type LanguageContentType = {
  article: SingulaPlural,
  comment: SingulaPlural,
  date: SingulaPlural,
  follower: SingulaPlural,
  image: SingulaPlural,
  like: SingulaPlural,
  reply: SingulaPlural,
  user: SingulaPlural,
  view: SingulaPlural,
  tag: SingulaPlural,
  result: SingulaPlural, 
}

type LanguageButton = {
  signUp: string,
  logIn: string,
  seeMore: string,
  seeLess: string,
  readMore: string,
  apply: string,
  sortBy: string,
  type: string,
  addComment: string,
  respond: string,
  hide: SingulaPlural,
  cancel: string,
  previous: string,
  follow: string,
  unfollow: string,
  upload: string,
  send: string
}

type LanguageDate = {
  year: SingulaPlural,
  month: SingulaPlural,
  week: SingulaPlural,
  day: SingulaPlural,
  hour: SingulaPlural,
  minute: SingulaPlural,
  second: SingulaPlural,
  prefix: string,
  sufix: string,
  justNow: string,
}

type LanguagePlaceHolder = {
  search: string,
  tagsPlaceholder: string,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  title: string,
  description: string,
  chooseAnImage: string
}

type LanguageImageUpload ={
  uploadAvatar: string,
  uploadBanner: string,
  uploadImage: string,
}

type LanguageAlt = {
  button: string,
  by: string,
  link: string,
}

type LanguageMessage = {
  notification: LanguageNotificationMessage,
  error: LanguageErrorMessage,
}

type LanguageNotificationMessage = {
  noTag: string,
}

type LanguageErrorMessage = {
  noResultFound: string,
  imageNotFound: string,
  nameTooShort: string,
  nameTooLong: string,
  nameAlreadyExist: string,
  emaiInvalid: string,
  emailAlreadyExist: string,
  passwordTooShort: string,
  passwordMustHaveSPCharacter: string,
  confPasswordNotIndentical: string,
}

type LanguageUtilities = {
  languageName: string,
  flagKey: string,
  uniCode: string,
}

type Language = {
  en: LanguageData,
  fr: LanguageData
}

export type {Language, LanguageData}