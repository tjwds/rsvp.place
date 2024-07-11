import { Link } from "@nextui-org/react";
import AuthContext from "./AuthContext";

import Nav from "./Nav";
import { ErrorProvider } from "@/hooks/useError";
import { ErrorMessage } from "@/elements/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function AccountLayout({ children }) {
  return (
    <ErrorProvider>
      <AuthContext>
        <Nav />
        {/* TODO …I do not remember why I added these z-40s. */}
        <div className="flex z-40 w-full h-auto justify-center min-h-[70vh]">
          <div className="z-40 flex px-6 gap-4 w-full flex-col relative items-left h-[var(--navbar-height)] max-w-[1024px]">
            {children}
          </div>
        </div>
        <ErrorMessage />
        <footer className="flex w-full justify-center bg-content2 text-content2-foreground min-h-[max(20vh,_200px)] text-sm p-8 mt-8">
          <div className="max-w-[1024px] w-full grid grid-cols-2 gap-3">
            <div>
              <div className="pb-2">
                <strong>rsvp.place</strong>
              </div>
              <ul>
                <li>
                  <Link href="/" className="text-content2-foreground text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/manifesto"
                    className="text-content2-foreground text-sm"
                  >
                    Manifesto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pages/terms"
                    className="text-content2-foreground text-sm"
                  >
                    Terms of Service & Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="pb-2">rsvp.place © 2024 Joe Woods.</div>
              <ul>
                <li>
                  <a href="mailto:hi@rsvp.place">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ width: "1em", marginRight: "0.3em" }}
                    />
                    Contact us
                  </a>
                </li>
                <li>
                  <a href="https://github.com/tjwds/rsvp.place">
                    <FontAwesomeIcon
                      icon={faGithub}
                      style={{ width: "1em", marginRight: "0.3em" }}
                    />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/Bexfsz9D">
                    <FontAwesomeIcon
                      icon={faDiscord}
                      style={{ width: "1em", marginRight: "0.3em" }}
                    />
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </AuthContext>
    </ErrorProvider>
  );
}
