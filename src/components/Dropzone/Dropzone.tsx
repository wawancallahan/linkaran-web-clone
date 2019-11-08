import React, { Component, createRef } from "react";
import "./Dropzone.css";

interface DropzoneProps {
    disabled: boolean,
    onFilesAdded: ([]: any[]) => void,
    multiple: boolean
}

type Props = DropzoneProps;

type State = {
    hightlight: boolean,
    files: any[]
}

class Dropzone extends Component<Props, State> {

    state = {
        hightlight: false,
        files: []
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
        const array = this.fileListToArray(files);

        this.props.onFilesAdded(array);
        this.setState({
            files: array
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
                {this.state.files.length > 0 &&
                    <>
                        <h3>Previews</h3>
                        {this.state.files.map((file: {
                            lastModified: number,
                            name: string,
                            preview: string,
                            size: number,
                            type: string
                        }) => (
                            <div className="thumb" key={file.name}>
                                <div className="thumbInner">
                                    <img
                                        src={file.preview}
                                        className="imgPreview"
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
      </>
    );
  }
}

export default Dropzone;
