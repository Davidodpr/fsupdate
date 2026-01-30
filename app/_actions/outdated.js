export default async function outdated(_, res) {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Flyttsmart</title>
      <style id="stitches">
        @media {
          .ErrorBody {
            margin: 0px;
            display: flex;
            flex-direction: column;
            justify-content: start;
            font-family: Gilroy;
            background: #e8edf0;
          }
          .headerBody {
            position: sticky;
            z-index: 99;
            top: 0;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
          }
          .flex {
            display: flex;
          }
          .Box {
            height: 56px;
            background: #fff;
            padding-left: 16px;
            justify-content: start;
            align-content: center;
          }
          .linkText {
            padding-top: 24px;
            color: #214766;
            text-decoration: underline;
            font-feature-settings: 'pnum' on, 'lnum' on;
          }
          .ErrorTextWrapper {
            display: flex;
            justify-content: center;
            align-content: center;
            width: 100%;
            background: #fff;
            box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.07);
            max-width: 50%;
            min-height: 250px;
            text-align: center;
            padding: 16px;
            margin: 24px auto;
            border-radius: 10px;
          }
          .ErrorTextBody {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          .ErrorTitle {
            font-family: Gilroy;
            font-size: 32px;
            font-weight: 800;
            text-align: center;
            width: 100%;
          }
          .ErrorDiscription {
            padding-top: 8px;
            font-size: 16px;
            display: flex;
            justify-content: center;
            direction: column;
            width: 325px;
          }
          @media (max-width: 680px) {
            .Box {
              height: 86px;
            }
            .ErrorTextWrapper {
              max-width: 80%;
            }
            .ErrorTitle {
              font-size: 24px;
            }
            .ErrorDiscription {
              max-width: 80%;
            }
            .linkText {
              max-width: 80%;
            }
          }
        }
        @media {
          .flex-awKDG-justifyContent-start {
            justify-content: flex-start;
          }
          .flex-jroWjL-alignItems-center {
            align-items: center;
          }
          .flex-iTKOFX-direction-column {
            flex-direction: column;
          }
          .flex-bICGYT-justifyContent-center {
            justify-content: center;
          }
        }
        @media {
          .flex-icRXmyT-css {
            width: 1168px;
            height: 110%;
          }
        }
      </style>
    </head>
    <body class="ErrorBody">
      <header class="headerBody">
        <div class="flex Box">
          <div class="flex flex-awKDG-justifyContent-start flex-jroWjL-alignItems-center flex-icRXmyT-css">
            <a href="https://www.flyttsmart.se/">
              <svg viewBox="0 0 183 33" fill="none" xmlns="http://www.w3.org/2000/svg" width="177" height="32" alt="Flyttsmart">
                <g clip-path="url(#Logo2_svg__a)" fill="#214766">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M183 25.163s-14.398-1.646-17.935-5.314c-3.537-3.669-3.537-9.617 0-13.285 3.537-3.669 9.273-3.669 12.811 0C181.413 10.232 183 25.163 183 25.163Zm-11.711-7.957c-2.202 0-3.986-1.85-3.986-4.133s1.784-4.134 3.986-4.134c2.201 0 3.985 1.851 3.985 4.134 0 2.282-1.784 4.133-3.985 4.133Z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="m162.746 10.676.016.09a9.067 9.067 0 0 1 2.319-3.987 9.018 9.018 0 0 1 12.8 0c.969.974 1.791 2.767 2.474 4.857a9.119 9.119 0 0 0 .357-2.538c0-5.025-4.052-9.098-9.051-9.098-4.13 0-7.615 2.781-8.7 6.582l-3.599 2.11 3.384 1.984Zm12.894 15.87c-3.408-.702-7.101-1.663-9.808-2.902 2.601 4.332 5.829 8.381 5.829 8.381s1.912-2.398 3.979-5.478Z"
                  ></path>
                  <path
                    d="M71.58 13.152c0-.906.873-1.376 1.946-1.376 1.242 0 2.181.637 2.685 1.711l3.69-2.013c-1.308-2.315-3.657-3.556-6.375-3.556-3.455 0-6.374 1.912-6.374 5.334 0 5.905 8.656 4.563 8.656 7.012 0 .973-.94 1.443-2.315 1.443-1.678 0-2.818-.805-3.288-2.181l-3.758 2.114c1.208 2.583 3.69 3.992 7.046 3.992 3.59 0 6.744-1.745 6.744-5.368 0-6.173-8.657-4.63-8.657-7.112Zm30.065-5.234c-2.281 0-3.959.906-4.998 2.415-.94-1.543-2.483-2.415-4.563-2.415-2.148 0-3.724.838-4.664 2.248V8.387h-4.328v16.775h4.328v-9.427c0-2.516 1.309-3.791 3.154-3.791 1.812 0 2.818 1.207 2.818 3.187v10.031h4.328v-9.427c0-2.516 1.208-3.791 3.12-3.791 1.812 0 2.818 1.207 2.818 3.187v10.031h4.328V14.83c0-4.194-2.516-6.911-6.341-6.911Zm22.674.47v1.979c-1.208-1.51-3.019-2.45-5.469-2.45-4.462 0-8.152 3.859-8.152 8.858 0 4.999 3.69 8.857 8.152 8.857 2.45 0 4.261-.94 5.469-2.449v1.98h4.328V8.386h-4.328Zm-4.663 13.118c-2.651 0-4.63-1.913-4.63-4.731 0-2.818 1.979-4.73 4.63-4.73 2.684 0 4.663 1.912 4.663 4.73 0 2.818-1.979 4.73-4.663 4.73Zm17.152-10.233V8.387h-4.328v16.775h4.328v-8.018c0-3.523 2.852-4.53 5.1-4.26V8.051c-2.114 0-4.228.94-5.1 3.22Zm19.119 1.275v-4.16h-3.791V3.69L147.808 5v3.388h-2.919v4.16h2.919v6.979c0 4.53 2.046 6.307 8.119 5.636v-3.925c-2.483.134-3.791.1-3.791-1.711v-6.978h3.791Z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.581.428v4.147l-2.61.012c-2.21 0-3.227 1.465-3.227 3.632v.168H10.3v4.16H6.744v12.615H2.416V12.547H0v-4.16h2.416V8.22C2.416 3.686 4.743.428 9.97.428c2.414 0 2.502-.006 2.589-.001h.022Zm6.597 24.734H14.85V.671h4.328v24.491Zm11.083-5.502 3.724-11.273h4.63l-6.106 16.775c-1.745 4.831-4.596 6.945-8.857 6.71v-4.026c2.382.034 3.59-.973 4.395-3.22L21.169 8.386h4.73l4.362 11.273Zm20.68-11.273v4.16H47.15v6.979c0 1.811 1.308 1.845 3.791 1.71v3.926c-6.073.671-8.12-1.107-8.12-5.636v-6.979h-2.918v-4.16h2.919V5L47.15 3.69v4.697h3.791Zm12.662 0v4.16h-3.79v6.979c0 1.811 1.308 1.845 3.79 1.71v3.926c-6.072.671-8.119-1.107-8.119-5.636v-6.979h-2.919v-4.16h2.92V5l4.327-1.309v4.697h3.791Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="Logo2_svg__a"><path fill="#fff" d="M0 0h183v32.025H0z"></path></clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </header>
      <div class="flex ErrorTextWrapper flex-iTKOFX-direction-column flex-bICGYT-justifyContent-center flex-jroWjL-alignItems-center">
        <div class="flex ErrorTextBody">
          <div class="ErrorTitle">Uppdatera din webbläsare!</div>
          <div class="ErrorDiscription">Din webbläsare stödjs inte av vår tjänst — kontrollera att du använder den senaste versionen.</div>
        </div>
        <a href="https://flyttsmart.se/setoutdated" class="linkText">Jag vill forstätta, även om det kanske inte funkar som det ska</a>
      </div>
    </body>
  </html>
`)
}
