import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { submitMeme, updateUpload } from '../../actions/memeActions.js';
import Button from '@material-ui/core/Button';

function Create(props) {

    useEffect(() => {

    }, [])

    const buildUpload = (prop) => (e) => {
        const target = e.target
        const value = prop == 'title' ? target.value : target.files?.[0]
        props.dispatch(updateUpload({ ...props.upload, [prop]: value }))
    };

    return (
        <>
            <div className="container">
                <div className="header">
                    <h2>CREATE MEME</h2>
                    <div className="c-add-meme">
                        <a style={{textDecoration: 'none'}} href="/home">
                            <Button variant="contained">Home</Button>
                        </a>
                    </div>
                </div>
                <hr></hr>
                <div className="c-upload-card">
                    <div className="m-upload-title">
                        <label htmlFor="title" >Title:</label>
                        <input type="text"
                            name="title"
                            placeholder="meme title"
                            value={props.upload.title}
                            onChange={buildUpload('title')}>
                        </input>
                    </div>
                    <div className="m-upload-file">
                        <p>Select file for upload:</p>
                        <div className="file-select-flex">
                            <input type="file"
                                name="upload"
                                id="file-select"
                                onChange={buildUpload('file')}>
                            </input>
                            <label htmlFor="file-select">
                                <span>Choose File</span>
                            </label>
                            {props.upload.file ?
                                <div className="file-info">
                                    <small>name: {props.upload.file.name}</small>
                                    <small>type: {props.upload.file.type}</small>
                                </div>
                            : null}
                        </div>
                    </div>
                    <hr></hr>
                    <div className="c-bottom-controls">
                        {props.upload.isUploaded ?
                            <div className="uploaded-thumb">
                                <small>Uploaded!</small>
                                <img src={props.upload.src} />
                            </div>
                        : <span></span>}
                        <div className="m-submit-file">
                            <a href="/home" className="btn">Cancel</a>
                            <button type="button"
                                className="btn btn-primary"
                                onClick={() => props.dispatch(submitMeme(props.upload))}
                            >Submit Meme
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
const mapStateToProps = state => {
    return {
        upload: state.memeData.upload
    };
};

export default connect(mapStateToProps)(Create)
