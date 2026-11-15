"use client";
import { useState } from 'react'
import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import DeleteModal from '../../../components/modals/deleteModal';

const UserChat = () => {

  const routes = all_routes;

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Message',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Message',
      active: true,
    },
  ];

  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleSearchToggle = () => {
    setIsChatVisible(!isChatVisible);
  };




  const [isEmojiListFootVisible, setIsEmojiListFootVisible] = useState(false);
  const toggleEmojiListFoot = () => {
    setIsEmojiListFootVisible(!isEmojiListFootVisible);
  };


  return (
    <div>
      <Breadcrumb
        title="Message"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-04"
      />
      <>
        {/* Page Wrapper */}
        <div className="content">
          <div className="container">
            <div className="customer-chat">
              <div className="header-navigation">
                <Link href={routes.userDashboard} className="d-inline-flex align-items-center">
                  <i className="isax isax-arrow-left me-2" />
                  Back to Dashboard
                </Link>
              </div>
              <div className="row chat-window">
                {/* Chat User List */}
                <div className="col-lg-4 chat-cont-left ">
                  <div className="card mb-0 flex-fill">
                    <div className="chat-header">
                      <div className="mb-3">
                        <h6>Chats</h6>
                      </div>
                      <div className="input-icon">
                        <span className="input-icon-addon">
                          <i className="isax isax-search-normal-14" />
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-md"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                    <div className="card-body chat-users-list chat-scroll pt-0">
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online  flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Beth Williams</h6>
                            <p className="fs-14 d-flex align-items-center">
                              <i className="isax isax-image5 me-1" />
                              Image
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">20/03/24</p>
                            <div className="d-flex align-items-center justify-content-end">
                              <i className="fa-solid fa-check" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg  flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-29.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Adrian Marshall</h6>
                            <p className="fs-14 text-gray-6 text-truncate">
                              Have you called them?
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">Just Now</p>
                            <div className="d-flex justify-content-end">
                              <span className="msg-count badge badge-primary d-flex align-items-center justify-content-center rounded-circle">
                                2
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-19.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Robert Miller</h6>
                            <p className="fs-14 d-flex align-items-center">
                              <i className="isax isax-video5 me-1" />
                              Video
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">5 Mins Ago</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-30.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Robert Miller</h6>
                            <p className="fs-14 d-flex align-items-center">
                              <i className="isax isax-document-text-15 me-1" />
                              Project Tools.doc
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">10:20 PM</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-31.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Samuel James</h6>
                            <p className="fs-14 d-flex align-items-center">
                              <i className="isax isax-microphone-25 me-1" />
                              Audio
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">12:30 PM</p>
                            <div>
                              <i className="fa-solid fa-check-double text-success" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-32.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Adrian Marshall</h6>
                            <p className="fs-14 text-gray-6">Have you called them?</p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">Just Now</p>
                            <div className="d-flex justify-content-end">
                              <span className="msg-count badge badge-primary d-flex align-items-center justify-content-center rounded-circle">
                                3
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-08.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Timothy Brewer</h6>
                            <p className="fs-14 text-gray-6 d-flex align-items-center">
                              <i className="ti ti-file me-1" />
                              Document
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">5 Mins Ago</p>
                            <div>
                              <i className="fa fa-check" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member  mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-09.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Tom Andrews</h6>
                            <p className="fs-14 text-danger d-flex align-items-center ">
                              <i className="isax isax-call5 me-1 text-gray-9" />
                              Missed Call
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">Yesterday</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member  mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-33.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Peter Anderson</h6>
                            <p className="fs-14  d-flex align-items-center ">
                              Have you called them?
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">23/03/24</p>
                            <div>
                              <i className="fa fa-check" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member  mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-20.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Samuel James</h6>
                            <p className="fs-14  d-flex align-items-center ">
                              <i className="isax isax-document-text-15 me-1" />
                              Prescription.doc
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">20/03/24</p>
                            <div>
                              <i className="fa fa-check" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member mb-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-15.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">John James</h6>
                            <p className="fs-14 text-danger d-flex align-items-center ">
                              <i className="isax isax-call5 me-1 text-gray-9" />
                              Missed Call
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">Yesterday</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        href="#"
                        className="d-flex justify-content-between chat-member"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath
                              src="assets/img/users/user-12.jpg"
                              alt="User Image"
                            />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Timothy Brewer</h6>
                            <p className="fs-14 text-danger d-flex align-items-center ">
                              <i className="isax isax-call5 me-1 text-gray-9" />
                              Missed Call
                            </p>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="text-end">
                            <p className="mb-1 fs-14 text-gray-6">Yesterday</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Chat User List */}
                {/* Chat Content */}
                <div className="col-lg-8 chat-cont-right chat-window-long">
                  {/* Chat History */}
                  <div className="card chat-window mb-0 shadow-none flex-fill">
                    <div className="card-header border-0">
                      <div className="msg_head">
                        <div className="d-flex bd-highlight align-items-center">
                          <Link
                            id="back_user_list"
                            href="#"
                            className="back-user-list"
                          >
                            <i className="fas fa-chevron-left" />
                          </Link>
                          <div className="avatar avatar-lg online flex-shrink-0 me-2">
                            <ImageWithBasePath src="assets/img/users/user-08.jpg" alt="User" />
                          </div>
                          <div>
                            <h6 className="fs-16 fw-medium mb-1">Aariyan Jose</h6>
                            <p className="fs-14">Online</p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center send-action">
                          <Link
                            href="#"
                            className="btn chat-search-btn send-action-btn"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Search"
                            onClick={handleSearchToggle}
                          >
                            <i className="isax isax-search-normal-14" />
                          </Link>
                          <Link
                            className="btn no-bg send-action-btn rounded-circle"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-dots-vertical" />
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link href={routes.allService1} className="dropdown-item">
                                <i className="isax isax-close-circle me-2" />
                                Close Chat
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <i className="fa-solid fa-volume-xmark me-2" />
                                Mute Notification
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <i className="isax isax-clock me-2" />
                                Disappearing Message
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <i className="isax isax-refresh me-2" />
                                Clear Message
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <i className="isax isax-trash me-2" />
                                Delete Chat
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <i className="fa-regular fa-thumbs-down me-2" />
                                Report
                              </Link>
                            </li>
                            <li>
                              <Link href="#" className="dropdown-item">
                                <i className="fa-solid fa-ban me-2" />
                                Block
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* Chat Search */}
                      {isChatVisible && (
                        <div className="chat-search search-wrap contact-search visible-chat">
                          <form>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Contacts"
                              />
                              <span className="input-group-text">
                                <i className="isax isax-search-normal-14" />
                              </span>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* /Chat Search */}
                    </div>
                    <div className="card-body msg_card_body chat-scroll">
                      <ul className="list-unstyled">
                        <li className="sent-message-group">
                          <ul>
                            <li className="media sent d-flex align-items-end">
                              <div className="media-body flex-grow-1">
                                <div className="msg-box">
                                  <div className="d-flex align-items-center justify-content-end mb-1">
                                    <div>
                                      <h6 className="fs-16 fw-normal d-flex align-items-center">
                                        Chris Foxy
                                      </h6>
                                      <div className="d-flex justify-content-end">
                                        <p className="fs-12">
                                          9:45 AM{" "}
                                          <i className="ms-1 text-success fa-solid fa-check-double" />
                                        </p>
                                      </div>
                                    </div>
                                    <div className="ms-2">
                                      <ImageWithBasePath
                                        src="assets/img/users/user-lg-26.jpg"
                                        alt="image"
                                        className="avatar avatar-lg"
                                      />
                                    </div>
                                  </div>
                                  <div className="position-relative">
                                    <div className="d-flex align-items-center">
                                      <div className="chat-actions me-2">
                                        <Link
                                          href="#"
                                          data-bs-toggle="dropdown"
                                        >
                                          <i className="fa-solid fa-ellipsis-vertical" />
                                        </Link>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                          <li>
                                            <Link
                                              className="dropdown-item reply-btn"
                                              href="#"
                                            >
                                              <i className="isax isax-back-square me-2" />
                                              Reply
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-regular fa-share-from-square me-2" />
                                              Forward
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-copy me-2" />
                                              Copy
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-heart me-2" />
                                              Mark as Favourite
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#message-delete"
                                            >
                                              <i className="isax isax-trash me-2" />
                                              Delete
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-solid fa-check me-2" />
                                              Mark as Unread
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-archive-1 me-2" />
                                              Archeive Chat
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-solid fa-thumbtack me-2" />
                                              Pin Chat
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="sent-message">
                                        <p className="fs-14">
                                          Hello! I’m interested in booking a cruise
                                          tour. Could you help me with some details?
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li className="text-center day-badge mb-4">
                          <span className="badge badge-light badge-md text-gray-9 fw-normal fs-14 rounded-pill mx-auto">
                            Today, March 25
                          </span>
                        </li>
                        <li className="media received">
                          <div className="d-flex align-items-center mb-1">
                            <div className="avatar avatar-lg flex-shrink-0 me-2">
                              <ImageWithBasePath
                                src="assets/img/users/user-08.jpg"
                                alt="User Image "
                              />
                            </div>
                            <div>
                              <h6 className="fs-16 fw-normal d-flex align-items-center">
                                Beth Williams
                              </h6>
                              <div className="d-flex justify-content-start">
                                <p className="fs-12">10:47 AM</p>
                              </div>
                            </div>
                          </div>
                          <div className="media-body flex-grow-1">
                            <div className="msg-box">
                              <div className="position-relative">
                                <div className="d-flex align-items-center ">
                                  <div className="received-message me-2">
                                    <p className="fs-14">
                                      Hello! Absolutely, I'd be happy to assist. Could
                                      you please let me know which destinations or
                                      type of cruise you’re interested in?
                                    </p>
                                  </div>
                                  <div className="chat-actions me-2">
                                    <Link
                                      href="#"
                                      data-bs-toggle="dropdown"
                                    >
                                      <i className="fa-solid fa-ellipsis-vertical" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                      <li>
                                        <Link
                                          className="dropdown-item reply-btn"
                                          href="#"
                                        >
                                          <i className="isax isax-back-square me-2" />
                                          Reply
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-regular fa-share-from-square me-2" />
                                          Forward
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-copy me-2" />
                                          Copy
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-heart me-2" />
                                          Mark as Favourite
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#message-delete"
                                        >
                                          <i className="isax isax-trash me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-solid fa-check me-2" />
                                          Mark as Unread
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-archive-1 me-2" />
                                          Archeive Chat
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-solid fa-thumbtack me-2" />
                                          Pin Chat
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="sent-message-group">
                          <ul>
                            <li className="media sent d-flex align-items-end">
                              <div className="media-body flex-grow-1">
                                <div className="msg-box">
                                  <div className="d-flex align-items-center justify-content-end mb-1">
                                    <div>
                                      <h6 className="fs-16 fw-normal d-flex align-items-center">
                                        Chris Foxy
                                      </h6>
                                      <div className="d-flex justify-content-end">
                                        <p className="fs-12">
                                          11:00 AM{" "}
                                          <i className="ms-1 text-success fa-solid fa-check-double" />
                                        </p>
                                      </div>
                                    </div>
                                    <div className="ms-2">
                                      <ImageWithBasePath
                                        src="assets/img/users/user-lg-26.jpg"
                                        alt="image"
                                        className="avatar avatar-lg"
                                      />
                                    </div>
                                  </div>
                                  <div className="position-relative">
                                    <div className="d-flex align-items-center">
                                      <div className="chat-actions me-2">
                                        <Link
                                          href="#"
                                          data-bs-toggle="dropdown"
                                        >
                                          <i className="fa-solid fa-ellipsis-vertical" />
                                        </Link>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                          <li>
                                            <Link
                                              className="dropdown-item reply-btn"
                                              href="#"
                                            >
                                              <i className="isax isax-back-square me-2" />
                                              Reply
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-regular fa-share-from-square me-2" />
                                              Forward
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-copy me-2" />
                                              Copy
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-heart me-2" />
                                              Mark as Favourite
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#message-delete"
                                            >
                                              <i className="isax isax-trash me-2" />
                                              Delete
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-solid fa-check me-2" />
                                              Mark as Unread
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-archive-1 me-2" />
                                              Archeive Chat
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-solid fa-thumbtack me-2" />
                                              Pin Chat
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="sent-message">
                                        <p className="fs-14">
                                          I was looking at the Caribbean options. Do
                                          you have any upcoming cruises with stops in
                                          the Bahamas and Jamaica?
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li className="media received">
                          <div className="d-flex align-items-center mb-1">
                            <div className="avatar avatar-lg flex-shrink-0 me-2">
                              <ImageWithBasePath
                                src="assets/img/users/user-08.jpg"
                                alt="User Image "
                              />
                            </div>
                            <div>
                              <h6 className="fs-16 fw-normal d-flex align-items-center">
                                Beth Williams
                              </h6>
                              <div className="d-flex justify-content-start">
                                <p className="fs-12">11:00 AM</p>
                              </div>
                            </div>
                          </div>
                          <div className="media-body flex-grow-1">
                            <div className="msg-box">
                              <div className="position-relative">
                                <div className="d-flex align-items-center ">
                                  <div className="received-message me-2">
                                    <p className="fs-14">
                                      Yes, we do! We have a 7-day Caribbean cruise
                                      that includes stops in the Bahamas, Jamaica, and
                                      Cozumel, Mexico. It departs on December 15.
                                      Would this be of interest?
                                    </p>
                                  </div>
                                  <div className="chat-actions me-2">
                                    <Link
                                      href="#"
                                      data-bs-toggle="dropdown"
                                    >
                                      <i className="fa-solid fa-ellipsis-vertical" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                      <li>
                                        <Link
                                          className="dropdown-item reply-btn"
                                          href="#"
                                        >
                                          <i className="isax isax-back-square me-2" />
                                          Reply
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-regular fa-share-from-square me-2" />
                                          Forward
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-copy me-2" />
                                          Copy
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-heart me-2" />
                                          Mark as Favourite
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#message-delete"
                                        >
                                          <i className="isax isax-trash me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-solid fa-check me-2" />
                                          Mark as Unread
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-archive-1 me-2" />
                                          Archeive Chat
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-solid fa-thumbtack me-2" />
                                          Pin Chat
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="sent-message-group">
                          <ul>
                            <li className="media sent d-flex align-items-end">
                              <div className="media-body flex-grow-1">
                                <div className="msg-box">
                                  <div className="d-flex align-items-center justify-content-end mb-1">
                                    <div>
                                      <h6 className="fs-16 fw-normal d-flex align-items-center">
                                        Chris Foxy
                                      </h6>
                                      <div className="d-flex justify-content-end">
                                        <p className="fs-12">
                                          11:05 AM
                                          <i className="ms-1 text-success fa-solid fa-check-double" />
                                        </p>
                                      </div>
                                    </div>
                                    <div className="ms-2">
                                      <ImageWithBasePath
                                        src="assets/img/users/user-lg-26.jpg"
                                        alt="image"
                                        className="avatar avatar-lg"
                                      />
                                    </div>
                                  </div>
                                  <div className="position-relative">
                                    <div className="d-flex align-items-center">
                                      <div className="chat-actions me-2">
                                        <Link
                                          href="#"
                                          data-bs-toggle="dropdown"
                                        >
                                          <i className="fa-solid fa-ellipsis-vertical" />
                                        </Link>
                                        <ul className="dropdown-menu dropdown-menu-end p-3">
                                          <li>
                                            <Link
                                              className="dropdown-item reply-btn"
                                              href="#"
                                            >
                                              <i className="isax isax-back-square me-2" />
                                              Reply
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-regular fa-share-from-square me-2" />
                                              Forward
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-copy me-2" />
                                              Copy
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-heart me-2" />
                                              Mark as Favourite
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                              data-bs-toggle="modal"
                                              data-bs-target="#message-delete"
                                            >
                                              <i className="isax isax-trash me-2" />
                                              Delete
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-solid fa-check me-2" />
                                              Mark as Unread
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="isax isax-archive-1 me-2" />
                                              Archeive Chat
                                            </Link>
                                          </li>
                                          <li>
                                            <Link
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              <i className="fa-solid fa-thumbtack me-2" />
                                              Pin Chat
                                            </Link>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="sent-message">
                                        <p className="fs-14">
                                          That sounds perfect! Could you tell me about
                                          the cabin options and pricing?
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li className="media received">
                          <div className="d-flex align-items-center mb-1">
                            <div className="avatar avatar-lg flex-shrink-0 me-2">
                              <ImageWithBasePath
                                src="assets/img/users/user-08.jpg"
                                alt="User Image "
                              />
                            </div>
                            <div>
                              <h6 className="fs-16 fw-normal d-flex align-items-center">
                                Beth Williams
                              </h6>
                              <div className="d-flex justify-content-start">
                                <p className="fs-12">11:10 AM</p>
                              </div>
                            </div>
                          </div>
                          <div className="media-body flex-grow-1">
                            <div className="msg-box">
                              <div className="position-relative">
                                <div className="d-flex align-items-center">
                                  <div className="received-message me-2">
                                    <p className="fs-14">
                                      Of course. We offer the following cabin options
                                    </p>
                                    <div className="d-flex align-items-center">
                                      <Link href="#">
                                        <ImageWithBasePath
                                          src="assets/img/cruise/cruise-14.jpg"
                                          alt="image"
                                          className="avatar avatar-xxl me-2"
                                        />
                                      </Link>
                                      <Link href="#">
                                        <ImageWithBasePath
                                          src="assets/img/cruise/cruise-29.jpg"
                                          alt="image"
                                          className="avatar avatar-xxl me-2"
                                        />
                                      </Link>
                                      <div className="img-count">
                                        <Link href="#">
                                          <ImageWithBasePath
                                            src="assets/img/cruise/cruise-13.jpg"
                                            alt="image"
                                            className="avatar avatar-xxl me-2"
                                          />
                                        </Link>
                                        <Link href="#">
                                          <span className="fs-16 fw-medium text-white counts">
                                            10+
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="chat-actions me-2">
                                    <Link
                                      href="#"
                                      data-bs-toggle="dropdown"
                                    >
                                      <i className="fa-solid fa-ellipsis-vertical" />
                                    </Link>
                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                      <li>
                                        <Link
                                          className="dropdown-item reply-btn"
                                          href="#"
                                        >
                                          <i className="isax isax-back-square me-2" />
                                          Reply
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-regular fa-share-from-square me-2" />
                                          Forward
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-copy me-2" />
                                          Copy
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-heart me-2" />
                                          Mark as Favourite
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#message-delete"
                                        >
                                          <i className="isax isax-trash me-2" />
                                          Delete
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-solid fa-check me-2" />
                                          Mark as Unread
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="isax isax-archive-1 me-2" />
                                          Archeive Chat
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item"
                                          href="#"
                                        >
                                          <i className="fa-solid fa-thumbtack me-2" />
                                          Pin Chat
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end">
                                  <Link href="#">
                                    <span>
                                      <ImageWithBasePath
                                        src="assets/img/icons/thumbs-up.svg"
                                        alt="image"
                                      />
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer border-0">
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center chat-input-icons">
                          <Link
                            className="btn no-bg"
                            href="#"
                            data-bs-toggle="dropdown"
                          >
                            <i className="ti ti-dots-vertical" />
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end p-3">
                            <Link href="#" className="dropdown-item">
                              <i className="isax isax-camera me-2" />
                              Camera
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <i className="isax isax-gallery me-2" />
                              Gallery
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <i className="isax isax-audio-square me-2" />
                              Audio
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <i className="isax isax-location me-2" />
                              Location
                            </Link>
                            <Link href="#" className="dropdown-item">
                              <i className="isax isax-user-cirlce-add me-2" />
                              Contact
                            </Link>
                          </div>
                          <div className="form-item emoj-action-foot">
                            <Link href="#" className="action-circle" onClick={toggleEmojiListFoot}>
                              <i className="fa-regular fa-face-smile" />
                            </Link>

                            <div className="emoj-group-list-foot down-emoji-circle" style={{ display: isEmojiListFootVisible ? 'block' : 'none' }}>
                              <ul>
                                <li>
                                  <Link href="#">
                                    <ImageWithBasePath
                                      src="assets/img/icons/emonji-02.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <ImageWithBasePath
                                      src="assets/img/icons/emonji-05.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <ImageWithBasePath
                                      src="assets/img/icons/emonji-06.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <ImageWithBasePath
                                      src="assets/img/icons/emonji-07.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                                <li>
                                  <Link href="#">
                                    <ImageWithBasePath
                                      src="assets/img/icons/emonji-08.svg"
                                      alt="Icon"
                                    />
                                  </Link>
                                </li>
                                <li className="add-emoj">
                                  <Link href="#">
                                    <i className="isax isax-add" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <Link href="#">
                            <i className="isax isax-microphone-2" />
                          </Link>
                        </div>
                        <div className="chat-input me-2">
                          <input
                            className="form-control"
                            placeholder="Type your message here..."
                          />
                        </div>
                        <div>
                          <button className="btn btn-primary btn_send">
                            <i
                              className="isax isax-send-25 text-white"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Chat Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>


      <DeleteModal id="message-delete" />
    </div>
  )
}

export default UserChat
