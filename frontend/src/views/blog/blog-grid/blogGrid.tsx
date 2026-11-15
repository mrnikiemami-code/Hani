"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';
import type { BlogSummaryItem } from "@/features/content/domain/blog";
import { useLocale, useTranslations } from "next-intl";

const BlogGrid = ({
    posts = [],
    totalCount,
    page,
    locale,
}: {
    posts?: BlogSummaryItem[];
    totalCount?: number;
    page?: number;
    locale?: string;
}) => {

    const routes = all_routes
    const t = useTranslations("common");
    const currentLocale = useLocale();

    //Breadcrumb Data
    const breadcrumbs = [
        {
            label: 'Blog',
            link: routes.allService1,
            active: false,
        },
        {
            label: 'Page',
            active: true,
        },
        {
            label: 'Blog Grid',
            active: true,
        },
    ];

    return (
        <div>

            <Breadcrumb
                title="Blog Grid"
                breadcrumbs={breadcrumbs}
                backgroundClass="breadcrumb-bg-02"
            />
            <>
                {/* Page Wrapper */}
                <div className="content">
                    <div className="container">
                        <div className="row justify-content-center">
                            {posts.map((post, index) => (
                                <div className="col-xl-4 col-md-6" key={post.postId}>
                                    <div className="blog-item mb-4 wow fadeInUp" data-wow-delay="0.2s">
                                        <Link
                                            href={`/blog/blog-details?slug=${encodeURIComponent(post.slug)}`}
                                            className="blog-img"
                                        >
                                            <ImageWithBasePath
                                                src={post.coverUrl ?? `assets/img/blog/blog-0${(index % 6) + 1}.jpg`}
                                                alt={post.title}
                                            />
                                        </Link>
                                        <span className="badge bg-primary fs-13 fw-medium">
                                            {t("blog")}
                                        </span>
                                        <div className="blog-info text-center">
                                            <div className="d-inline-flex align-items-center justify-content-center">
                                                <p className="text-white mb-2">
                                                    <i className="isax isax-calendar-2 me-2" />
                                                    {post.publishedAt
                                                        ? new Intl.DateTimeFormat(locale ?? currentLocale, {
                                                              dateStyle: "medium"
                                                          }).format(new Date(post.publishedAt))
                                                        : ""}
                                                </p>
                                            </div>
                                            <h5>
                                                <Link
                                                    href={`/blog/blog-details?slug=${encodeURIComponent(post.slug)}`}
                                                >
                                                    {post.title}
                                                </Link>
                                            </h5>
                                            <p className="text-white-50 fs-14 mb-0">{post.excerpt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {posts.length === 0 && (
                                <div className="col-12">
                                    <p className="text-center text-gray-6">No blog posts found.</p>
                                </div>
                            )}
                        </div>
                            {/* Pagination */}
                            <nav className="pagination-nav">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <Link
                                            className="page-link"
                                            href="#"
                                            aria-label="Previous"
                                        >
                                            <span aria-hidden="true">
                                                <i className="fa-solid fa-chevron-left" />
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            1
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            2
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            3
                                        </Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link className="page-link" href="#">
                                            4
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" href="#">
                                            5
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link
                                            className="page-link"
                                            href="#"
                                            aria-label="Next"
                                        >
                                            <span aria-hidden="true">
                                                <i className="fa-solid fa-chevron-right" />
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            {/* /Pagination */}
                    </div>
                </div>
                {/* /Page Wrapper */}
            </>


        </div>
    )
}

export default BlogGrid
