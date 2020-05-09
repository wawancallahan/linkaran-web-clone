import React, { Component, createRef } from "react";
import "./Dropzone.css";
import { Button } from "reactstrap";
import '../../react-lazyload.d.ts'
import LazyLoad from 'react-lazyload'
interface DropzoneProps {
    disabled: boolean,
    onFilesAdded: ([]: any[]) => void,
    multiple: boolean
}

type Props = DropzoneProps & {
    previewUrl?: string,
    removeFile?: boolean
    onClickRemove?: (file: File & {
        preview: string
    }, index: number) => void
};

type State = {
    hightlight: boolean,
    files: any[],
    firstRender: boolean
}

class Dropzone extends Component<Props, State> {

    state = {
        hightlight: false,
        files: [],
        firstRender: true
    }

    private fileInputRef = createRef<HTMLInputElement>();


  openFileDialog = () => {
    if (this.props.disabled) return;

    this.fileInputRef.current!.click();
  }

  onFilesAdded = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.props.disabled) return;
    
    const files = e.currentTarget.files;
    
    if (this.props.onFilesAdded) {
        const fileList = this.fileListToArray(files);

        this.props.onFilesAdded(fileList);
        this.setState({
            files: fileList,
            firstRender: false
        });
    }
  }

  onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (this.props.disabled) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (this.props.disabled) return;

    const files = e.dataTransfer.files;

    if (this.props.onFilesAdded) {
        const array = this.fileListToArray(files);
        this.props.onFilesAdded(array);
        this.setState({
            files: array
        });
        
    }

    this.setState({ hightlight: false });
  }

  removeSelectedFile(file: File) {

    console.log('remove');

    this.setState(prevState => {
        const index = prevState.files.indexOf(file);
        const files = prevState.files.slice(0);
        files.splice(index, 1);
        return {
            files
        }; 
    });
  }

  removeAllFile = () => {
    this.setState({
        files: [],
        firstRender: false
    });
  }

  fileListToArray = (list: FileList | null) => {
    const array = [];

    if (list) {
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
    }

    const newArray = array.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
    }));

    return newArray;
  }

  render() {

    let previewImage = null;

    if (this.state.files.length > 0) {
        previewImage = (
            <>
                <h3>Previews</h3>
                {this.state.files.map((file: File & {
                    preview: string
                }, index: number) => {

                    const removeFileButton = this.props.removeFile && this.props.removeFile === true ? 
                    (
                        <Button type="button" color="danger" size="sm" onClick={() => {
                            if (this.props.onClickRemove) {
                                this.props.onClickRemove(file, index);
                            }
                            this.removeSelectedFile(file);
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

                
            </>
        );
    } else if (this.props.previewUrl && this.state.firstRender) {
        previewImage = (
            <>
                <h3>Previews</h3>
                <div className="thumb">
                    <div className="thumbInner">
                        <LazyLoad debounce={250}>
                            <img
                                src={this.props.previewUrl}
                                className="imgPreview"
                            />
                        </LazyLoad>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                multiple={this.props.multiple}
                onChange={this.onFilesAdded}
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
      </>
    );
  }
}

export default Dropzone;