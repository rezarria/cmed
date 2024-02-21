import { BreadCr, Button, Trans } from "@/components/common"
import { MainLayout } from "@/components/layout"
import { Document } from "@/types"
import { formatDate, instance } from "@/utils"
import { GetServerSidePropsContext } from "next"
import parse from "html-react-parser"
import React from "react"
import { useTranslation } from "react-i18next"
import { DocumentItem } from "@/components/documents"
import { Grid } from "@mantine/core"
import PdfViewer from "@/components/pdfViewer/PdfViewer"
import Link from "next/link"
import { modals } from "@mantine/modals"
import ContactForm from "@/components/contact/ContactForm"

interface NewsDetailProps {
    document: Document
    relatedDocuments: Document[]
    otherDocuments: Document[]
}

const DocumentsDetail = ({
    document,
    relatedDocuments,
    otherDocuments,
}: NewsDetailProps) => {
    const { t } = useTranslation()

    const breadCrumbsItems = [
        {
            name: t("documents.title"),
            link: "/documents",
        },
        {
            name: document.category.name,
            link: `/documents?c=${document.category.id}`,
        },
    ]

    const downloadFile = () => {
        window.open(document.document, "_blank")
    }

    const handleDownload = () =>
        modals.open({
            size: "xl",
            title: t("common.downloadDocumentForm"),
            children: (
                <ContactForm
                    showContent={false}
                    submitFunction={downloadFile}
                />
            ),
        })

    return (
        <MainLayout>
            <div className="container m-auto px-4 mt-28">
                <BreadCr items={breadCrumbsItems} />
                <h1 className="text-2xl md:text-4xl font-bold uppercase mb-4">
                    {document.name}
                </h1>
                <p className="text-sm mb-2">
                    {formatDate(document.createdAt, " - ")}
                </p>
                <div className="pb-10">{parse(document.description)}</div>

                <div className="grid grid-cols-4">
                    <div className="col-span-3">
                        <PdfViewer url={document.document} />
                        <div className="pt-10">
                            <Button className="m-auto" onClick={handleDownload}>
                                <Trans text="common.downloadDocument" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-md md:text-xl uppercase my-10 text-center">
                            <Trans text="documents.detail.related" />
                        </h3>
                        <div className="bg-primary/10 p-4 flex flex-col gap-4">
                            {relatedDocuments.length > 0 &&
                                relatedDocuments.map((item) => (
                                    <div className="p-3 bg-secondary">
                                        <Link href={`/documents/${item.id}`}>
                                            <h4 className="line-clamp-2 font-semibold mb-2">
                                                {item.name}
                                            </h4>
                                        </Link>

                                        <p className="text-sm">
                                            {formatDate(item.createdAt)}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <h2 className="text-xl md:text-3xl uppercase my-10">
                    <Trans text="documents.others" />
                </h2>
                <Grid className="w-full pb-20">
                    {otherDocuments.length > 0 &&
                        otherDocuments.map((item) => (
                            <Grid.Col span={3}>
                                <DocumentItem key={item.id} document={item} />
                            </Grid.Col>
                        ))}
                </Grid>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    if (!context.params || typeof context.params.id !== "string") {
        return {
            notFound: true,
        }
    }
    const { id } = context.params
    const { data: document }: { data: Document } = await instance.get(
        `/documents/${id}`
    )
    const { data }: { data: Document[] } = await instance.get(
        `/documents?c=${document.category.id}&perPage=7`
    )

    const { data: otherDocumentsRaw } =
        await instance.get(`/documents?perPage=5`)

    const relatedDocuments = data
        .filter((item) => item.id !== document.id)
        .slice(0, 6)

    const otherDocuments = otherDocumentsRaw
        .filter((item: Document) => item.id !== document.id)
        .slice(0, 4)

    return {
        props: {
            document,
            relatedDocuments,
            otherDocuments,
        },
    }
}

export default DocumentsDetail
