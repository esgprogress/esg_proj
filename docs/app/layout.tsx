import {Footer, Layout, Navbar} from 'nextra-theme-docs'
import {Banner, Head} from 'nextra/components'
import {getPageMap} from 'nextra/page-map'
import './globals.css'
import {Metadata} from "next";
import {NextraSearchDialog} from "@/components/nextra-search-dialog";
import {getPagesFromPageMap} from "@/lib/getPagesFromPageMap";
import Image from "next/image";
import esgProgressLogo from '../assets/images/esgProgressLogo.svg'
import {GoogleAnalytics} from "@next/third-parties/google";

export const metadata: Metadata = {
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="some-key"></Banner>
const logo_enclosure = <div className="flex h-11 w-11 items-center justify-center shadow-sm flex-row">
                                    <Image src={esgProgressLogo} alt="ESGProgress Logo"/>
                                    <p className="text-white text-sm font-semibold">
                                        ESGProgress Docs
                                    </p>
                                </div>

const navbar = (
    <Navbar
        projectLink="https://github.com/ArjunQuickwork/esg_proj"
        logo={logo_enclosure}

    />
)
const footer = <Footer>MIT @ ESGProgress.org</Footer>

export default async function RootLayout({children}) {
    const pageMap = await getPageMap();
    const pages = await getPagesFromPageMap({
        pageMapArray: pageMap,
        // modify page data if needed
        // filterItem: async (item) => {
        //     return {
        //         ...item,
        //     };
        // }
    });


    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
        >
        <Head
            // ... Your additional head options
        >
            <link rel="shortcut icon" href="/images/general/icon.svg"/>
            {/* Your additional tags should be passed as `children` of `<Head>` element */}
        </Head>
        <body>
        <Layout
            // banner={banner}
            navbar={navbar}
            pageMap={pageMap}
            docsRepositoryBase="https://github.com/ArjunQuickwork/esg_proj/docs"
            footer={footer}
            search={<NextraSearchDialog pages={pages}/>}
            // ... Your additional layout options
        >
            {children}
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}/>
        </Layout>
        </body>
        </html>
    )
}