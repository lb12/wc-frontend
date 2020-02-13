import React from "react";

import { FacebookShareButton, FacebookIcon } from "react-share";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { TelegramShareButton, TelegramIcon } from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { LinkedinShareButton, LinkedinIcon } from "react-share";
import { EmailShareButton, EmailIcon } from "react-share";

export default class ShareMediaToolbar extends React.Component {
  render() {
    const shareUrl = window.location.href;
    return (
      <div>
        <LinkedinShareButton url={shareUrl} quote={"WOW"} className="button">
          <LinkedinIcon size={32} round={false} />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl} quote={"WOW"} className="button">
          <TwitterIcon size={32} round={false} />
        </TwitterShareButton>
        <FacebookShareButton url={shareUrl} quote={"WOW"} className="button">
          <FacebookIcon size={32} round={false} />
        </FacebookShareButton>

        <TelegramShareButton url={shareUrl} quote={"WOW"} className="button">
          <TelegramIcon size={32} round={false} />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl} quote={"WOW"} className="button">
          <WhatsappIcon size={32} round={false} />
        </WhatsappShareButton>

        <EmailShareButton url={shareUrl} quote={"WOW"} className="button">
          <EmailIcon size={32} round={false} />
        </EmailShareButton>
      </div>
    );
  }
}
