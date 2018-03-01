
angular.module('echo.config.assetConfig', [])
  .constant('assetConfig', {
    ICON_GOOGLE_MAPS_MARKER_URL: '/assets/images/icon-gm-marker.png',
    ICON_GOOGLE_MAPS_MULTIPLE_MARKER_URL: '/assets/images/icon-gm-multiple-marker.svg',
    PNG_FALLBACK: '/assets/images/thumbnail_PNG.jpg',
    JPG_FALLBACK: '/assets/images/thumbnail_JPG.jpg',
    PDF_FALLBACK: '/assets/images/thumbnail_PDF.jpg',
    STAGE_DOCUMENT_THUMBNAIL: '/assets/images/stage-document-thumbnail.png',
    STAGE_DOCUMENT: '/assets/images/stage-document.png'
  });
