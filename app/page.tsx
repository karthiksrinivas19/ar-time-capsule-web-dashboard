import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>memories&nbsp;</span>
        <br />
        <span className={title()}>
          worth reliving.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful. Nostalgic. Realistic.
        </div>
      </div>

      <div className="flex gap-3">
        {/* <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link> */}
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by downloading the <Code color="primary">
            <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template" // replace this with apk link
                title="heroui.com homepage"
              >
                app
              </Link>
            </Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
