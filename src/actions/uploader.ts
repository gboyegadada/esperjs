export const COM_UPLOADER_BROWSE = 'COM_UPLOADER_BROWSE'
export const COM_UPLOADER_CAPTURE = 'COM_UPLOADER_CAPTURE'
export const COM_UPLOADER_READY = 'COM_UPLOADER_READY'
export const COM_UPLOADER_CLEAR = 'COM_UPLOADER_CLEAR'

export const capture = (file: string) => {
  return {
    type: COM_UPLOADER_CAPTURE,
    file,
  }
}

export const browse = () => {
  return {
    type: COM_UPLOADER_BROWSE,
  }
}