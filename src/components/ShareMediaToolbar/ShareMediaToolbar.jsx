import React from "react";

import { FacebookShareButton, FacebookIcon } from "react-share";
import { TwitterShareButton, TwitterIcon }   from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";

import "./ShareMediaToolbar.css";

export default class ShareMediaToolbar extends React.Component {
  render() {
    const shareUrl = window.location.href;
    return (
      <div className="social-share-container">
        <LinkedinShareButton url={shareUrl} className="button">
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl} className="button">
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton url={shareUrl} className="button">
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
    );
  }
}
