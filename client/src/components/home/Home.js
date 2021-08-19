import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getMemes } from '../../actions/memeActions'
import { BrowswerRouter as Router, Link } from 'react-router-dom'
// import './style.css'

function Home(props) {

    useEffect(() => {
        props.dispatch(getMemes())
    }, [])

    return (
        <>
            <div className="container-xl home">
                <div className="header">
                    <h2>CURRENT MEMES</h2>
                    <div className="c-add-meme">
                        <p>ADD NEW MEME</p>
                        <a href="/create">
                            <div>
                                <svg className="add-icon" focusable="false" viewBox="0 0 24 24"
                                    aria-hidden="true">
                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
                <hr></hr>
                <div className="c-meme-grid">
                    {props.memes.length ? props.memes.map(meme => (
                        <div key={meme.meme_id} className="m-grid-item">
                            <h3>{meme.title}</h3>
                            <img src={meme.src} />
                            <div className="m-meme-btn">
                                <Link className="view-btn" to={`/view/${meme.meme_id}`}>VIEW MEME</Link>
                            </div>
                        </div>
                    )) : (
                        <p className="empty-memes">Doesn't look like you have any memes, go ahead and add one...</p>
                    )}
                    {props.error && <p>{props.error.error}</p>}
                </div>
            </div>

        </>
    );
}
const mapStateToProps = state => {
    return {
        memes: state.memeData.memes,
        error: state.memeData.error
    };
};

export default connect(mapStateToProps)(Home)
