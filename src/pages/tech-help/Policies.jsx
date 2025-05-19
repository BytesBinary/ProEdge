import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useFetchPageBlocks } from '../../context/PageContext';
import PageHeader from '../../components/common/utils/banner/SubPageHeader';

const Policies = () => {
    const { pathname } = useLocation();

    const cleanPathname = pathname.replace(/\//g, '');

    const { blocks } = useFetchPageBlocks(cleanPathname);

    const breadcrumb = blocks?.filter(
        (block) => block?.item?.type?.toLowerCase().trim() === "breadcrumb"
    )[0];

    const page_text = blocks?.filter(
        (block) => block?.item?.type?.toLowerCase().trim() === "page_text"
    )[0];

    console.log(page_text, "page_text");

    return (
        <>
            <PageHeader
                title={breadcrumb?.item?.title}
                bgImage={`${import.meta.env.VITE_SERVER_URL}/assets/${breadcrumb?.item?.image?.id}`}
                breadcrumbs={[{ link: "/", label: "Home" }, { label: breadcrumb?.item?.title }]}
            />
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                        {page_text?.item?.text ? (
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: page_text.item.text,
                                }}
                            />
                        ) : (
                            <div>No policy content available.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Policies;
