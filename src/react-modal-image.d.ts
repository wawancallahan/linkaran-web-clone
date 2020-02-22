declare module 'react-modal-image' {
    import { FC } from 'react'

    interface ModalImageProps {
        // Optional. class for the small preview image.
        className?: string,
        // Optional. alt for the small image and the heading text in Lightbox.
        alt?: string,
        // src for the small preview image.
        small: URL,
        // Optional. srcSet for the small preview image.
        smallSrcSet?: string,
        // Optional if large is defined. Image shown when zoomed out in Lightbox.
        medium?: URL,
        // Optional if medium is defined. Image shown when zoomed in Lightbox. Downloadable.
        large?: URL,
        // Optional. Set to true to hide download-button from the Lightbox.
        hideDownload?: boolean,
        // Optional. Set to true to hide zoom-button from the Lightbox.
        hideZoom?: boolean,
        // Optional. Set to true to show rotate-button within the Lightbox.
        showRotate?: boolean,
        // Optional. Background color of the image shown in Lightbox. Defaults to black. Handy for transparent images.
        imageBackgroundColor?: string
    }
    
    type LighboxProps = ModalImageProps & {
        onClose: () => void
    }
    
    const ModalImage: FC<ModalImageProps>;
    
    export const Lighbox: FC<LighboxProps>;
    
    export default ModalImage;
}