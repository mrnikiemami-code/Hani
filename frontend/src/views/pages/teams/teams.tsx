"use client";

import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import Link from "next/link";
import ImageWithBasePath from '../../../components/image-with-base-path';
import { all_routes } from '../../../routes/all_routes';

const Teams = () => {

  const routes = all_routes

  //Breadcrumb Data
  const breadcrumbs = [
    {
      label: 'Team',
      link: routes.allService1,
      active: false,
    },
    {
      label: 'Pages',
      active: true,
    },
    {
      label: 'Team',
      active: true,
    },
  ];

  return (
    <div>
      <Breadcrumb
        title="Team"
        breadcrumbs={breadcrumbs}
        backgroundClass="breadcrumb-bg-02"
      />

      <>
        {/* Page Wrapper */}
        <div className="content">
          <div className="container">
            <div className="row justify-content-center row-gap-5">
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-17.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>James Parker</Link>
                    </h5>
                    <p>Chief Executive Officer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-18.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Morgan Owen</Link>
                    </h5>
                    <p className="fs-16">Chief Operations Officer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-19.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Richard Dolan </Link>
                    </h5>
                    <p className="fs-16">Chief Marketing Officer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-20.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Lindsay Brookins</Link>
                    </h5>
                    <p className="fs-16">Chief Technology Officer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-29.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Sheila Sanders</Link>
                    </h5>
                    <p className="fs-16">Chief Financial Officer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-22.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Douglas Gill</Link>
                    </h5>
                    <p>Head of Sales</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-28.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Mary Brainerd</Link>
                    </h5>
                    <p className="fs-16">Content Writer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-23.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Steven Johnson </Link>
                    </h5>
                    <p className="fs-16">Chief Product Officer</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-25.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Adam Whitlow</Link>
                    </h5>
                    <p>Marketing Specialist</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-30.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Gabriella Noggle</Link>
                    </h5>
                    <p className="fs-16">Account Manager</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-24.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>James Holmes</Link>
                    </h5>
                    <p className="fs-16">Booking Coordinator</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
              {/* Team Members */}
              <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-12">
                <div className="card team">
                  <div className="card-body">
                    <Link href={routes.myProfile}>
                      <ImageWithBasePath
                        src="assets/img/users/user-lg-27.jpg"
                        className="img-fluid"
                        alt="Img"
                      />
                    </Link>
                  </div>
                  <div className="team-member rounded-pill text-center shadow">
                    <h5>
                      <Link href={routes.myProfile}>Emma Reedy</Link>
                    </h5>
                    <p className="fs-16">Sales Representative</p>
                  </div>
                </div>
              </div>
              {/* Team Members */}
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>


    </div>
  )
}

export default Teams
