/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import "./App.css";
import FreshChat from "react-freshchat";
import EmailEditor from "react-email-editor";
import { useEffect, useRef, useId } from "react";
import template from "./template.json";
import axios from "axios";
import Demo from "./Demo";
import TourApp from "./Tour/TourApp";
import * as Sentry from "@sentry/react";

// import ReactGA from 'react-ga';
// ReactGA.initialize('G-48J5MBRB2B');
// import { render } from 'react-dom';

function App() {
  const emailEditorRef = useRef(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI3NjI4NjksImV4cCI6MTczOTE2Mjg2OSwic3ViIjoiYWRtaW4ifQ.PIR_N4ih7bGyo_XugXO6fmWytxe9qSnHLSYH34AHp9o";

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }, []);

  const id = useId();
  console.log(id);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { design, html } = data;
      console.log(JSON.stringify(design));
      let res = await axios.post(
        "http://localhost:23700/v2.0/mailers/template",
        {
          html,
          name: "Mail chào mừng user mới",
          mailType: "WELCOMING",
          templateJson: JSON.stringify(design),
        }
      );
      // console.log("res", res);
    });
  };

  const updateMail = () => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { design, html } = data;
      let res = await axios.put(
        "http://localhost:23700/v2.0/mailers/template",
        {
          _id: "628354fc12acbb574b5b0527",
          html,
          name: "Mail chào mừng user mới nhe",
        }
      );
      console.log("res", res);
    });
  };

  const sendMail = () => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { design, html } = data;
      let res = await axios.post(
        "http://localhost:23700/v2.0/mailers/template/sendmail",
        {
          email: "arr.pushT@gmail.com",
          context: {
            INVESTERCODE: "Nong hihi",
            OTP: 11120,
          },
          subject: "Mail chào mừng user mới nhe",
          mailType: "WELCOMING",
        }
      );
      console.log("res", res);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    emailEditorRef.current.editor.loadDesign(template);
  };
  const onGetDataMail = () => {
    axios.get("http://localhost:23700/v2.0/mailers/template");
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  // Copy the below lines under window.fcWidget.init inside initFreshChat function in the above snippet

  // To set unique user id in your system when it is available
  // window.fcWidget.setExternalId("Nong.doe1987");

  // // To set user name
  // window.fcWidget.user.setFirstName("Nong");

  // // To set user email
  // window.fcWidget.user.setEmail("Nong.doe@gmail.com");

  // // To set user properties
  // window.fcWidget.user.setProperties({
  //   plan: "ENTERPRISE", // meta property 1
  //   status: "Active", // meta property 2

  // });

  // window.fcWidget.setConfig({
  //   disableEvents: true,
  //   cssNames: {
  //     widget: 'fc_frame',
  //     open: 'fc_open',
  //     expanded: 'fc_expanded'
  //   },
  //   showFAQOnOpen: true,
  //   // hideFAQ: true,
  //   agent: {
  //     hideName: false,
  //     hidePic: false,
  //     hideBio: false,
  //   },
  //   // headerProperty: {
  //   //   //If you have multiple sites you can use the appName and appLogo to overwrite the values.
  //   //   appName: 'Gadget God',
  //   //   appLogo: 'https://hiepsibaotap.com/wp-content/uploads/2020/11/images-2.jpeg',
  //   //   backgroundColor: '#FFFF00',
  //   //   foregroundColor: '#333333',
  //   //   backgroundImage: 'https://wchat.freshchat.com/assets/images/texture_background_1-bdc7191884a15871ed640bcb0635e7e7.png'
  //   // },
  //   content: {
  //     placeholders: {
  //       search_field: 'Search',
  //       reply_field: 'Reply',
  //       csat_reply: 'Add your comments here'
  //     },
  //     actions: {
  //       csat_yes: 'Yes',
  //       csat_no: 'No',
  //       push_notify_yes: 'Yes',
  //       push_notify_no: 'No',
  //       tab_faq: 'Solutions',
  //       tab_chat: 'Chat',
  //       csat_submit: 'Submit'
  //     },
  //     headers: {
  //       chat: 'Chat with Us',
  //       chat_help: 'Reach out to us if you have any questions',
  //       faq: 'Solution Articles',
  //       faq_help: 'Browse our articles',
  //       faq_not_available: 'No Articles Found',
  //       faq_search_not_available: 'No articles were found for {{query}}',
  //       faq_useful: 'Was this article helpful?',
  //       faq_thankyou: 'Thank you for your feedback',
  //       faq_message_us: 'Message Us',
  //       push_notification: 'Don\'t miss out on any replies! Allow push notifications?',
  //       csat_question: 'Did we address your concerns??',
  //       csat_yes_question: 'How would you rate this interaction?',
  //       csat_no_question: 'How could we have helped better?',
  //       csat_thankyou: 'Thanks for the response',
  //       csat_rate_here: 'Submit your rating here',
  //       channel_response: {
  //         offline: 'We are currently away. Please leave us a message',
  //         online: {
  //           minutes: {
  //             one: "Currently replying in {!time!} minutes ",
  //             more: "Typically replies in {!time!} minutes"
  //           },
  //           hours: {
  //             one: "Currently replying in under an hour",
  //             more: "Typically replies in {!time!} hours",
  //           }
  //         }
  //       }
  //     }
  //   }
  // });
  return (
    <div className="App">
      {/* <div className="Nongg">
        <div>
          <FreshChat
            token={"7601cb18-3456-4ee4-8619-614e1de94d2d"}
            email="arr.push@gmail.com"
            onInit={(widget) => {
              console.log("Widget is ready!", widget);
              widget.user.setProperties({
                plan: "ENTERPRISE", // meta property 1
                status: "Active", // meta
              });
              widget.user.setFirstName("Nongg111");
              widget.setConfig({
                disableEvents: true,
                cssNames: {
                  widget: "fc_frame",
                  open: "fc_open",
                  expanded: "fc_expanded",
                },
                showFAQOnOpen: true,
                // hideFAQ: true,
                agent: {
                  hideName: false,
                  hidePic: false,
                  hideBio: false,
                },
                // headerProperty: {
                //   //If you have multiple sites you can use the appName and appLogo to overwrite the values.
                //   appName: "Gadget God",
                //   appLogo:
                //     "https://d1qb2nb5cznatu.cloudfront.net/startups/i/2473-2c38490d8e4c91660d86ff54ba5391ea-medium_jpg.jpg?buster=1518574527",
                //   backgroundColor: "#FFFF00",
                //   foregroundColor: "#333333",
                //   backgroundImage:
                //     "https://wchat.freshchat.com/assets/images/texture_background_1-bdc7191884a15871ed640bcb0635e7e7.png",
                // },
                headers: {
                  chat: "Chát với tui hihi",
                  chat_help: "Reach out to us if you have any questions",
                  faq: "Solution Articles",
                  faq_help: "Browse our articles",
                  faq_not_available: "No Articles Found",
                  faq_search_not_available:
                    "No articles were found for {{query}}",
                  faq_useful: "Was this article helpful?",
                  faq_thankyou: "Thank you for your feedback",
                  faq_message_us: "Message Us",
                  push_notification:
                    "Don't miss out on any replies! Allow push notifications?",
                  csat_question: "Did we address your concerns??",
                  csat_yes_question: "How would you rate this interaction?",
                  csat_no_question: "How could we have helped better?",
                  csat_thankyou: "Thanks for the response",
                  csat_rate_here: "Submit your rating here",
                  channel_response: {
                    offline: "We are currently away. Please leave us a message",
                    online: {
                      minutes: {
                        one: "Currently replying in {!time!} minutes ",
                        more: "Typically replies in {!time!} minutes",
                      },
                      hours: {
                        one: "Currently replying in under an hour",
                        more: "Typically replies in {!time!} hours",
                      },
                    },
                  },
                },
              });
            }}
          />
        </div>
      </div> */}
      {/* <h1>Hello</h1>
      <div>
        <div>
          <button onClick={exportHtml}>Create Mail</button>
        </div>
        <div>
          <button onClick={sendMail}>sendMail</button>
          <button onClick={updateMail}>updateMail</button>
          <button onClick={onGetDataMail}>getDataMail</button>
        </div>

        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div> */}
      {/* <div className="wrapper">
        <div className="contents">
          <div className="inner">These are the contents of this div</div>
        </div>
      </div> */}
      {/* <Demo /> */}
      <TourApp />
    </div>
  );
}

export default Sentry.withProfiler(App);
