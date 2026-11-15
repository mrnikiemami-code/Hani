"use client";

import { all_routes } from '../../../routes/all_routes';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Sidebar from '../../../components/common-sidebar/sidebar';
import ImageWithBasePath from '../../../components/image-with-base-path';
import Link from "next/link";

const MyProfile = () => {

  const routes = all_routes;
  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'My Profile',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'My Profile',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="My Profile"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-01"
      />

      {/* Page Wrapper */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-xl-3 col-lg-4">
              <Sidebar />
            </div>
            {/* /Sidebar */}
            {/* My Profile */}
            <div className="col-xl-9 col-lg-8">
              <div className="card shadow-none mb-0">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h6>My Profile</h6>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link
                      href={routes.profileSettings}
                      className="p-1 rounded-circle btn btn-light d-flex align-items-center justify-content-center"
                    >
                      <i className="isax isax-edit-2 fs-14" />
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="fs-16 mb-3">Basic Information</h6>
                  <div className="d-flex align-items-center mb-3">
                    <span className="avatar avatar-xl flex-shrink-0 me-3 ">
                      <ImageWithBasePath
                        src="assets/img/users/user-01.jpg"
                        alt="Img"
                        className="img-fluid rounded"
                      />
                    </span>
                    <div className="profile-upload">
                      <div className="mb-2">
                        <p className="fs-12">
                          Recommended image size is 40px x 40px
                        </p>
                      </div>
                      <div className="profile-uploader d-flex align-items-center">
                        <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                          Upload
                          <input
                            type="file"
                            className="form-control image-sign"
                            multiple
                          />
                        </div>
                        <Link
                          href="#"
                          className="btn btn-light btn-sm"
                        >
                          Cancel
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="row border-bottom pb-2 mb-3">
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">First Name</h6>
                        <p>Jeffrey </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">Last Name</h6>
                        <p>Wilson</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">Email</h6>
                        <p>chrfo2356@example.com</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2">
                        <h6 className="fs-14">Phone</h6>
                        <p>+1 12656 26654</p>
                      </div>
                    </div>
                  </div>
                  <h6 className="fs-16 mb-3">Address Information</h6>
                  <div className="row g-2">
                    <div className="col-md-12">
                      <div>
                        <h6 className="fs-14">Address</h6>
                        <p>4530 Clousson Road, Houston </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h6 className="fs-14">Country</h6>
                        <p>United States Of America</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h6 className="fs-14">State</h6>
                        <p>California</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h6 className="fs-14">City</h6>
                        <p>San Francisco</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <h6 className="fs-14">Postal Code</h6>
                        <p>94105</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /My Profile */}
          </div>
        </div>
      </div>
      {/* /Page Wrapper */}

    </div>
  )
}

export default MyProfile
