import * as React from "react";
import "./Dropzone.css";
import { Button } from "reactstrap";
import '../../react-lazyload.d.ts'
import LazyLoad from 'react-lazyload'

type DropzoneProps = {
    disabled: boolean,
    onFilesAdded: ([]: any[]) => void,
    multiple: boolean
}

type FilePreview = File & {
    preview: string;
}

type Props = DropzoneProps & {
    previewUrl?: string,
    removeFile?: boolean
    onClickRemove?: (file: File & {
        preview: string
    }, index: number) => void
};

const Dropzone: React.FC<Props> = (props) => {
    
    const [highlight, setHighlight] = React.useState(false)
    const [files, setFiles] = React.useState<FilePreview[]>([])
    const [firstRender, setFirstRender] = React.useState(true)
    const fileInputRef = React.createRef<HTMLInputElement>()

    const openFileDialog = () => {
        if (props.disabled) return;

        fileInputRef.current!.click();
    }

    const onFilesAdded = (e: React.FormEvent<HTMLInputElement>) => {
        if (props.disabled) return;
        
        const files = e.currentTarget.files;
        
        if (props.onFilesAdded) {
            const fileList = fileListToArray(files);

            props.onFilesAdded(fileList);
            setFiles(fileList)
            setFirstRender(false)
        }
    }
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (props.disabled) return;

        setHighlight(true)
    }
    
    const onDragLeave = () => {
        setHighlight(false)
    }
    
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    
        if (props.disabled) return;
    
        const files = e.dataTransfer.files;
    
        if (props.onFilesAdded) {
            const fileList = fileListToArray(files);
            props.onFilesAdded(fileList);
            
            setFiles(fileList)
        }
        
        setHighlight(false)
    }
    
    const removeSelectedFile = (file: FilePreview) => {
        const prevState = {
            ...files
        }

        const index = prevState.indexOf(file);
        const prevStateFiles = prevState.slice(0);
        prevStateFiles.splice(index, 1);

        setFiles(prevStateFiles)
    }
    
    const removeAllFile = () => {
        setFiles([])
        setFirstRender(false)
    }
    
    const fileListToArray = (list: FileList | null) => {
        const fileList = [];
    
        if (list) {
            for (var i = 0; i < list.length; i++) {
                fileList.push(list.item(i));
            }
        }
    
        const newFileList = fileList.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
    
        return newFileList;
    }

    let previewImage = null;

    if (files.length > 0) {
        previewImage = (
            <React.Fragment>
                <h3>Previews</h3>
                {files.map((file: FilePreview, index: number) => {

                    const removeFileButton = props.removeFile && props.removeFile === true ? 
                    (
                        <Button type="button" color="danger" size="sm" onClick={() => {
                            if (props.onClickRemove) {
                                props.onClickRemove(file, index);
                            }
                            removeSelectedFile(file);
                        }}>
                            <i className="fa fa-trash"></i> Hapus Upload Gambar
                        </Button>
                    ) : null;
                    
                    return (
                        <div key={index}>
                            <div className="thumb">
                                <div className="thumbInner">
                                    <img
                                        src={file.preview}
                                        className="imgPreview"
                                    />
                                </div>
                            </div>

                            {removeFileButton}
                        </div>
                    );
                })}
            </React.Fragment>
        );
    } else if (props.previewUrl && firstRender) {
        previewImage = (
            <React.Fragment>
                <h3>Previews</h3>
                <div className="thumb">
                    <div className="thumbInner">
                        <LazyLoad debounce={250}>
                            <img
                                src={props.previewUrl}
                                className="imgPreview"
                            />
                        </LazyLoad>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div
                className={`Dropzone ${highlight ? "Highlight" : ""}`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={openFileDialog}
                style={{ cursor: props.disabled ? "default" : "pointer" }}
            >
                <input
                ref={fileInputRef}
                className="FileInput"
                type="file"
                multiple={props.multiple}
                onChange={onFilesAdded}
                accept="image/*"
                />
                <img
                alt="upload"
                className="Icon"
                src="baseline-cloud_upload-24px.svg"
                />
                <span>Upload Files</span>
            </div>

            <div className="thumbsContainer">
               {previewImage}
            </div>
        </React.Fragment>
    )
}

export default Dropzone;