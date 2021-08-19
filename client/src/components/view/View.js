import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router'
import { viewMeme } from '../../actions/memeActions.js';
import Button from '@material-ui/core/Button';

function View(props) {
    const { id } = useParams()

    useEffect(() => {
        props.dispatch(viewMeme(id))
    }, [])

    return (
        <>
            <div className="container">
                <div className="header">
                    <h2>MY COOL MEME</h2>
                    <div className="c-add-meme">
                        <a style={{textDecoration: 'none'}} href="/home">
                            <Button variant="contained">Home</Button>
                        </a>
                    </div>
                </div>
                <hr></hr>
                { props.upload.title ?
                    <div className="c-view-meme">
                        <h3>{props.upload.title.toUpperCase()}</h3>
                        <div className="meme-img">
                            <img src={'/'+props.upload.src} />
                        </div>
                        <hr></hr>
                        <div className="m-submit-file">
                            <a href="/home" className="btn">Cancel</a>
                            <a href={'/'+props.upload.src} 
                                target="_blank"
                                download
                            >
                                <button 
                                    className="btn btn-primary"
                                    >Download Meme
                                </button>
                            </a>
                        </div>
                    </div>
                : null }
            </div>
        </>
    );
}
const mapStateToProps = state => {
    return {
        upload: state.memeData.meme
    };
};

export default connect(mapStateToProps)(View)
