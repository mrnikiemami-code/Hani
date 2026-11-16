"use client";
import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../image-with-base-path";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setDataTheme } from "../../redux/slices/themeSettingSlice";
import { all_routes } from "../../routes/all_routes";
import LoginModal from "../modals/loginModal";
import RegisterModal from "../modals/registerModal";
import ForgotPasswordModal from "../modals/forgotPassword";
import { useScrollLock } from '../../hooks/useScrollLock'
import ChangePasswordModal from "../modals/changePassword";

const Header = () => {
  const t = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const [isOffcanva, setIsOffcanva] = useState(false);
  const [isMegaMenu, setIsMegaMenu] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dispatch = useDispatch();
  const location = { pathname: usePathname() ?? "" };
  const dataTheme = useSelector((state: any) => state.themeSetting.dataTheme);
  const handleDataThemeChange = (theme: string) => {
    dispatch(setDataTheme(theme));
  };
  const openSubMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setOpenDropdownIndex(null);
  };
  const routes = all_routes;
  const toggleSubMenu = (index: any) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    setIsDropdownOpen(false);
  };
  useScrollLock(isOffcanva === true);
  const sideBar = [
    {
      tittle: "Home",
      base: "home",
      showAsTab: false,
      separateRoute: true,
      menu: [
        {
          menuValue: "All service - 1",
          img: "assets/img/menu/home-11.jpg",
          homeName: "All Services 1",
          route: "/index-1",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-1",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "All service - 2",
          img: "assets/img/menu/home-12.jpg",
          homeName: "All Services 2",
          route: "/index-2",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-2",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 1",
          img: "assets/img/menu/home-01.jpg",
          homeName: "All Services 3",
          route: "/index-3",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-3",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 2",
          img: "assets/img/menu/home-02.jpg",
          route: "/index-4",
          homeName: "Hotels",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-4",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 3",
          img: "assets/img/menu/home-03.jpg",
          route: "/index-5",
          homeName: "Cars",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-5",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 4",
          img: "assets/img/menu/home-04.jpg",
          route: "/index-6",
          homeName: "Flight",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-6",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 5",
          img: "assets/img/menu/home-05.jpg",
          route: "/index-7",
          homeName: "Cruise",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-7",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 6",
          img: "assets/img/menu/home-06.jpg",
          route: "/index-8",
          homeName: "Tours",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-8",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Home - 7",
          img: "assets/img/menu/home-07.jpg",
          route: "/index-9",
          homeName: "Bus",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-9",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Guide",
          img: "assets/img/menu/home-08.jpg",
          homeName: "Guide",
          route: "/index-10",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-10",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Activities",
          img: "assets/img/menu/home-09.jpg",
          homeName: "Activities",
          route: "/index-11",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-11",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Visa",
          img: "assets/img/menu/home-10.jpg",
          homeName: "Visa",
          route: "/index-12",
          hasSubRoute: false,
          showSubRoute: false,
          base: "/index-12",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Flight",
      base: "flight",
      subTitle: "Flight Booking",
      showAsTab: false,
      separateRoute: false,
      tabMenu: false,
      img: "assets/img/menu/flight.jpg",
      menu: [
        {
          menuValue: "Flight Grid",
          route: "/flight/flight-grid",
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight-grid",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Flight List",
          route: "/flight/flight-list",
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight-list",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Flight Details",
          route: "/flight/flight-details",
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight-details",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Seat Selection",
          route: routes.flightSeatSelection,
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight-seat-selection",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Flight Checkout",
          route: "/flight/flight-booking",
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight-bookings",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Flight Booking",
          route: routes.flightBookingConfirmation,
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight-booking-confirmation",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Add Flight",
          route: "/flight/add-flight",
          hasSubRoute: false,
          showSubRoute: false,
          base: "flight",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Edit Flight",
          route: routes.editFlight,
          hasSubRoute: false,
          showSubRoute: false,
          base: "edit-flight",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Hotel",
      base: "hotel",
      subTitle: "Hotel Booking",
      showAsTab: false,
      separateRoute: false,
      tabMenu: false,
      img: "assets/img/menu/hotel.jpg",
      menu: [
        {
          menuValue: "Hotel Grid",
          route: routes.hotelGrid,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-grid",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Hotel List",
          route: routes.hotelList,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-list",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Hotel Map",
          route: routes.hotelMap,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-map",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Hotel Details",
          route: routes.hotelDetails,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-details",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Room Selection",
          route: routes.hotelRoomSelection,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-room-selection",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Hotel Checkout",
          route: routes.hotelBooking,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-booking",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Hotel Booking",
          route: routes.hotelBookingConfirmation,
          hasSubRoute: false,
          showSubRoute: false,
          base: "hotel-bookings",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Add Hotel",
          route: routes.addHotel,
          hasSubRoute: false,
          showSubRoute: false,
          base: "add-hotel",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Edit Hotel",
          route: routes.editHotel,
          hasSubRoute: false,
          showSubRoute: false,
          base: "edit-hotel",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Car",
      base: "car",
      subTitle: "Car Booking",
      showAsTab: false,
      separateRoute: false,
      tabMenu: false,
      img: "assets/img/menu/car.jpg",
      menu: [
        {
          menuValue: "Car Grid",
          route: routes.carGrid,
          hasSubRoute: false,
          showSubRoute: false,
          base: "car-grid",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Car List",
          route: routes.carList,
          hasSubRoute: false,
          showSubRoute: false,
          base: "car-list",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Car Map",
          route: routes.carMap,
          hasSubRoute: false,
          showSubRoute: false,
          base: "car-map",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Car Details",
          route: routes.carDetails,
          hasSubRoute: false,
          showSubRoute: false,
          base: "car-details",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Car Checkout",
          route: routes.carBooking,
          hasSubRoute: false,
          showSubRoute: false,
          base: "car-bookings",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Car Booking",
          route: routes.carBookingConfirmation,
          hasSubRoute: false,
          showSubRoute: false,
          base: "car-booking-confirmation",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Add Car",
          route: routes.addCar,
          hasSubRoute: false,
          showSubRoute: false,
          base: "add-car",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Edit Car",
          route: routes.editCar,
          hasSubRoute: false,
          showSubRoute: false,
          base: "edit-car",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Cruise",
      base: "cruise",
      subTitle: "Cruise Booking",
      showAsTab: false,
      separateRoute: false,
      tabMenu: false,
      img: "assets/img/menu/cruise.jpg",
      menu: [
        {
          menuValue: "Cruise Grid",
          route: routes.cruiseGrid,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-grid",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Cruise List",
          route: routes.cruiseList,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-list",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Cruise Map",
          route: routes.cruiseMap,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-map",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Cruise Details",
          route: routes.cruiseDetails,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-details",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Cabin Selection",
          route: routes.cruiseCabinSelection,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-cabin-selection",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Cruise Checkout",
          route: routes.cruiseBooking,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-bookings",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Cruise Booking",
          route: routes.cruiseBookingConfirmation,
          hasSubRoute: false,
          showSubRoute: false,
          base: "cruise-booking-confirmation",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Add Cruise",
          route: routes.addCruise,
          hasSubRoute: false,
          showSubRoute: false,
          base: "add-cruise",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Edit Cruise",
          route: routes.editCruise,
          hasSubRoute: false,
          showSubRoute: false,
          base: "edit-cruise",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Tour",
      base: "tour",
      subTitle: "Tour Booking",
      showAsTab: false,
      separateRoute: false,
      tabMenu: false,
      img: "assets/img/menu/tour.jpg",
      menu: [
        {
          menuValue: "Tour Grid",
          route: routes.tourGrid,
          hasSubRoute: false,
          showSubRoute: false,
          base: "tour-grid",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Tour List",
          route: routes.tourList,
          hasSubRoute: false,
          showSubRoute: false,
          base: "tour-list",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Package Builder",
          route: routes.customPackageBuilder,
          hasSubRoute: false,
          showSubRoute: false,
          base: "custom-package-builder",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Tour Map",
          route: routes.tourMap,
          hasSubRoute: false,
          showSubRoute: false,
          base: "tour-map",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Tour Details",
          route: routes.tourDetails,
          hasSubRoute: false,
          showSubRoute: false,
          base: "tour-details",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Tour Checkout",
          route: routes.tourBooking,
          hasSubRoute: false,
          showSubRoute: false,
          base: "tour-bookings",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Tour Booking",
          route: routes.tourBookingConfirmation,
          hasSubRoute: false,
          showSubRoute: false,
          base: "tour-booking-confirmation",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Add Tour",
          route: routes.addTour,
          hasSubRoute: false,
          showSubRoute: false,
          base: "add-tour",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Edit Tour",
          route: routes.editTour,
          hasSubRoute: false,
          showSubRoute: false,
          base: "edit-tour",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Bus",
      base: "bus",
      subTitle: "Bus Booking",
      showAsTab: false,
      separateRoute: false,
      tabMenu: false,
      img: "assets/img/menu/bus.jpg",
      menu: [
        {
          menuValue: "Bus List",
          route: routes.busList,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-list",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Bus Left Sidebar",
          route: routes.busLeftSidebar,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-left-sidebar",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Bus Right Sidebar",
          route: routes.busRightSidebar,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-right-sidebar",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Bus Details",
          route: routes.busDetails,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-details",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Bus Seat Selection",
          route: routes.busSeatSelection,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-seat-selection",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Bus Booking",
          route: routes.busBooking,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-bookings",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Bus Booking Confirmation",
          route: routes.busBookingConfirmation,
          hasSubRoute: false,
          showSubRoute: false,
          base: "bus-booking-confirmation",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Add Bus",
          route: routes.addBus,
          hasSubRoute: false,
          showSubRoute: false,
          base: "add-bus",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
        {
          menuValue: "Edit Bus",
          route: routes.editBus,
          hasSubRoute: false,
          showSubRoute: false,
          base: "edit-bus",
          page: "",
          last: "",
          subMenus: [],
          icon: "",
        },
      ],
    },
    {
      tittle: "Pages",
      base: "pages",
      subTitle: "Pages",
      showAsTab: false,
      separateRoute: false,
      tabMenu: true,
      img: "assets/img/menu/flight.jpg",
      menu: [
        {
          title: "Activity",
          id: "activity",
          id2: "mob_activity",
          showtab: true,
          img: "assets/img/menu/activity.jpg",
          subMenus: [
            {
              menuValue: "Activity Grid",
              route: routes.activityGrid,
              hasSubRoute: false,
              showSubRoute: false,
              base: "activity-grid",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Activity List",
              route: routes.activityList,
              hasSubRoute: false,
              showSubRoute: false,
              base: "activity-list",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Activity Map",
              route: routes.activityMap,
              hasSubRoute: false,
              showSubRoute: false,
              base: "activity-map",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Activity Details",
              route: routes.activityDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "activity-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Activity Checkout",
              route: routes.activityBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "activity-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Add Activity",
              route: routes.addActivity,
              hasSubRoute: false,
              showSubRoute: false,
              base: "add-activity",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Edit Activity",
              route: routes.editActivity,
              hasSubRoute: false,
              showSubRoute: false,
              base: "edit-activity",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
          ],
        },
        {
          title: "Visa",
          id: "visa",
          id2: "mob_visa",
          showtab: false,
          img: "assets/img/menu/visa.jpg",
          subMenus: [
            {
              menuValue: "Visa Grid",
              route: routes.visaGrid,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-grid",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa List",
              route: routes.visaList,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-list",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa Details",
              route: routes.visaDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa Requirements",
              route: routes.visaRequirements,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-requirements",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa Application",
              route: routes.visaApplication,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-application",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa Booking Details",
              route: routes.visaBookingDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-booking-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa Booking Confirmation",
              route: routes.visaBookingConfirmation,
              hasSubRoute: false,
              showSubRoute: false,
              base: "visa-booking-confirmation",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Track Visa",
              route: routes.trackVisa,
              hasSubRoute: false,
              showSubRoute: false,
              base: "track-visa",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Add Visa",
              route: routes.addVisa,
              hasSubRoute: false,
              showSubRoute: false,
              base: "add-visa",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
          ],
        },
        {
          title: "Guide",
          id: "guide",
          id2: "mob_guide",
          showtab: false,
          img: "assets/img/menu/guide.jpg",
          subMenus: [
            {
              menuValue: "Guide Grid",
              route: routes.guideGrid,
              hasSubRoute: false,
              showSubRoute: false,
              base: "guide-grid",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Guide List",
              route: routes.guideList,
              hasSubRoute: false,
              showSubRoute: false,
              base: "guide-list",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Guide Details",
              route: routes.guideDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "guide-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Guide Booking",
              route: routes.guideBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "guide-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Add Guide",
              route: routes.addGuide,
              hasSubRoute: false,
              showSubRoute: false,
              base: "add-guide",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Edit Guide",
              route: routes.editGuide,
              hasSubRoute: false,
              showSubRoute: false,
              base: "edit-guide",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
          ],
        },
        {
          title: "Pages",
          id: "pages",
          id2: "mob_pages",
          showtab: false,
          subMenus: [
            {
              menuValue: "About",
              route: routes.about_us,
              hasSubRoute: false,
              showSubRoute: false,
              base: "about",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Gallery",
              route: routes.Gallery,
              hasSubRoute: false,
              showSubRoute: false,
              base: "gallery",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Faq",
              route: routes.FAQ,
              hasSubRoute: false,
              showSubRoute: false,
              base: "faq",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Compare",
              route: routes.compare,
              hasSubRoute: false,
              showSubRoute: false,
              base: "compare",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Style Guide",
              route: routes.styleGuide,
              hasSubRoute: false,
              showSubRoute: false,
              base: "style-guide",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Pricing Plan",
              route: routes.pricingPlan,
              hasSubRoute: false,
              showSubRoute: false,
              base: "pricing-plan",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Pricing Plan 2",
              route: routes.pricingPlantwo,
              hasSubRoute: false,
              showSubRoute: false,
              base: "pricing-plan-two",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Teams",
              route: routes.teams,
              hasSubRoute: false,
              showSubRoute: false,
              base: "teams",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Invoice",
              route: routes.invoices,
              hasSubRoute: false,
              showSubRoute: false,
              base: "invoice",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Blogs Grid",
              route: routes.blogGrid,
              hasSubRoute: false,
              showSubRoute: false,
              base: "blogs-grid",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Blogs List",
              route: routes.blogList,
              hasSubRoute: false,
              showSubRoute: false,
              base: "blogs-list",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Blogs Details",
              route: routes.blogDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "blogs-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "RTL",
              route: routes.homeOneRtl,
              hasSubRoute: false,
              showSubRoute: false,
              base: "rtl",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Destination",
              route: routes.destination,
              hasSubRoute: false,
              showSubRoute: false,
              base: "destination",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Destination Details",
              route: routes.destrinationDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "destination-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Recently Viewed",
              route: routes.recentlyViewed,
              hasSubRoute: false,
              showSubRoute: false,
              base: "recently-viewed",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Terms & Conditions",
              route: routes.termsConditions,
              hasSubRoute: false,
              showSubRoute: false,
              base: "Terms-Conditions",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Privacy Policy",
              route: routes.privacyPolicy,
              hasSubRoute: false,
              showSubRoute: false,
              base: "privacy-policy",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Login",
              route: routes.login,
              hasSubRoute: false,
              showSubRoute: false,
              base: "login",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Register",
              route: routes.register,
              hasSubRoute: false,
              showSubRoute: false,
              base: "register",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Forgot Password",
              route: routes.forgotPassword,
              hasSubRoute: false,
              showSubRoute: false,
              base: "forgot-password",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Change Password",
              route: routes.changepassword,
              hasSubRoute: false,
              showSubRoute: false,
              base: "change-password",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "404 Error",
              route: routes.Error404,
              hasSubRoute: false,
              showSubRoute: false,
              base: "404-error",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "500 Error",
              route: routes.Error500,
              hasSubRoute: false,
              showSubRoute: false,
              base: "500-error",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Coming Soon",
              route: routes.comingSoon,
              hasSubRoute: false,
              showSubRoute: false,
              base: "coming-soon",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Under Maintenance",
              route: routes.underMaintenance,
              hasSubRoute: false,
              showSubRoute: false,
              base: "under-maintenance",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Become an Expert",
              route: routes.becomeAnExpert,
              hasSubRoute: false,
              showSubRoute: false,
              base: "become-an-expert",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
          ],
        },
        {
          title: "Dashboard",
          title2: "Agent Dashboard",
          id: "dashboard",
          id2: "mob_dashboard",
          showtab: false,
          subMenus: [
            {
              menuValue: "User Dashboard",
              route: routes.userDashboard,
              hasSubRoute: false,
              showSubRoute: false,
              base: "dashboard",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "All Bookings",
              route: routes.userAllBookings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-all-bookings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Trip Details",
              route: routes.userTripDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-trip-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Manage Booking",
              route: routes.manageBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "manage-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "My Bookings",
              route: routes.userFlightBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-flight-bookings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Hotel Bookings",
              route: routes.userHotlesBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-hotel-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Car Bookings",
              route: routes.userCarBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-car-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Cruise Bookings",
              route: routes.userCruiseBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-cruise-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Tour Bookings",
              route: routes.userTourBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-tour-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Bus Bookings",
              route: routes.userBusBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-bus-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Activity Bookings",
              route: routes.userActivitiesBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-activities-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Visa Bookings",
              route: routes.userVisaBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-visa-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Tour Guides",
              route: routes.userTourGuideBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-tour-guides-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Travel Voucher",
              route: routes.travelVoucher,
              hasSubRoute: false,
              showSubRoute: false,
              base: "travel-voucher",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Cancellations & Refunds",
              route: routes.customerCancellationRefunds,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-cancellation-refunds",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Invoices",
              route: routes.customerInvoices,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-invoices",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Reviews",
              route: routes.userReviews,
              hasSubRoute: false,
              showSubRoute: false,
              base: "about",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Wishlist",
              route: routes.userWishlist,
              hasSubRoute: false,
              showSubRoute: false,
              base: "wishlist",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Wallet",
              route: routes.userWallet,
              hasSubRoute: false,
              showSubRoute: false,
              base: "about",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Payments",
              route: routes.payment,
              hasSubRoute: false,
              showSubRoute: false,
              base: "payment",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Offers & Rewards",
              route: routes.userCoupons,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-coupons",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Gift Cards",
              route: routes.userGiftCards,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-gift-cards",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Loyalty Points",
              route: routes.userLoyaltyPoints,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-loyalty-points",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Reward History",
              route: routes.userRewardHistory,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-reward-history",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Referral Program",
              route: routes.userReferralProgram,
              hasSubRoute: false,
              showSubRoute: false,
              base: "customer-referral-program",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Chat",
              route: routes.userChat,
              hasSubRoute: false,
              showSubRoute: false,
              base: "chat",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Notifications",
              route: routes.notification,
              hasSubRoute: false,
              showSubRoute: false,
              base: "notification",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "My Profile",
              route: routes.userMyProfile,
              hasSubRoute: false,
              showSubRoute: false,
              base: "my-profile",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Profile Settings",
              route: routes.profileSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "profile-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Security Settings",
              route: routes.securitySettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "security-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Notification Settings",
              route: routes.notificationSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "notification-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Preferences Settings",
              route: routes.preferencesSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "preferences-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue: "Integration Settings",
              route: routes.integrationSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "integration-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Dashboard",
              route: routes.agentDashboard,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-dashboard",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Listings",
              route: routes.agentListing,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-listing",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Bookings",
              route: routes.agentHotelBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-hotel-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Flight Bookings",
              route: routes.agentFlightBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-flight-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Car Bookings",
              route: routes.agentCarBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-car-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Cruise Bookings",
              route: routes.agentCruiseBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-cruise-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Tour Bookings",
              route: routes.agentTourBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-tour-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Bus Bookings",
              route: routes.agentBusBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-bus-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Activity Bookings",
              route: routes.agentActivitiesBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-activities-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Visa Bookings",
              route: routes.agentVisaBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-visa-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Booking Details",
              route: routes.agentBookingDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-booking-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Cancellation Requests",
              route: routes.agentCancellationRequest,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-cancellation-request",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Enquiries",
              route: routes.agentEnquirers,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-enquirers",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Enquiry Details",
              route: routes.agentEnquiriesDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-enquiry-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Tour Guides",
              route: routes.agentGuideBooking,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-guide-booking",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Earnings",
              route: routes.agentEarnings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-earnings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Commission Summary",
              route: routes.agentCommissionSummary,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-commission-summary",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Payment History",
              route: routes.agentPaymentHistory,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-payment-history",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Payouts",
              route: routes.agentPendingPayouts,
              hasSubRoute: false,
              showSubRoute: false,
              base: "pending-payouts",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Payout Request",
              route: routes.agentPayoutRequest,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-payout-request",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Reviews",
              route: routes.agentReview,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-review",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Chat",
              route: routes.agentChat,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-chat",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Notifications",
              route: routes.agentNotification,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-notifications",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Plans",
              route: routes.agentPlan,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-plans",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Business Details",
              route: routes.agentBussinessDetails,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-bussiness-details",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Settings",
              route: routes.agentSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Account Settings",
              route: routes.agentAccountSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-account-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Security Settings",
              route: routes.agentSecuritySettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-security-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Notification Settings",
              route: routes.agentNotificationSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-notification-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
            {
              menuValue2: "Plans Settings",
              route: routes.agentPlanSettings,
              hasSubRoute: false,
              showSubRoute: false,
              base: "agent-plans-settings",
              page: "",
              last: "",
              subMenus: [],
              icon: "",
            },
          ],
        },
      ],
    },
    {
      tittle: "Contact",
      base: "base",
      showAsTab: false,
      separateRoute: false,
      standalone: true,
      menu: [],
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 991) {
        setIsResponsive(true);
      } else {
        setIsResponsive(false);
        setIsOffcanva(false);
      }
    };

    // Call the function on mount
    handleResize();

    // Attach resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const DarkButton = () => {
    return (
      <div className="me-3">
        <Link
          href="#"
          id="dark-mode-toggle"
          className={`theme-toggle ${dataTheme === "light" && "activate"}`}
          aria-label={t("toggleDarkMode")}
          onClick={() => handleDataThemeChange("dark-mode")}
        >
          <i className="isax isax-moon" />
        </Link>
        <Link
          href="#"
          id="light-mode-toggle"
          className={`theme-toggle ${dataTheme === "dark-mode" && "activate"}`}
          aria-label={t("toggleLightMode")}
          onClick={() => handleDataThemeChange("light")}
        >
          <i className="isax isax-sun-1" />
        </Link>
      </div>
    );
  };
  return (
    <>
      <div
        className={`${location.pathname === "/index-10" || location.pathname === "/index-12" ? "" : "main-header"} ${location.pathname === "/index-4" || location.pathname === "/index-6" || location.pathname === "/index-8" ? "main-header-four" : ""} ${location.pathname === "/index-2" && "main-header-nine"} `}
      >
        {/* Header Topbar*/}
        {location.pathname === "/index-1" ||
          location.pathname === "/index-2" ||
          location.pathname === "/index-4" ||
          location.pathname === "/index-5" ||
          location.pathname === "/index-6" ||
          location.pathname === "/index-7" ||
          location.pathname === "/index-8" ||
          location.pathname === "/index-9" ||
          location.pathname === "/index-10" ||
          location.pathname === "/index-11" ||
          location.pathname === "/index-12" ? (
          <></>
        ) : (
          <div className="header-topbar text-center bg-transparent">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <p className="d-flex align-items-center fw-medium fs-14 mb-2">
                  <i className="isax isax-call5 me-2" />
                  Toll Free : +1 56565 56594
                </p>
                <div className="d-flex align-items-center">
                  <p className="mb-2 me-3 d-flex align-items-center fw-medium fs-14">
                    <i className="isax isax-message-text-15 me-2" />
                    Email : info@example.com
                  </p>
                  <div className="dropdown flag-dropdown mb-2 me-3">
                    <Link
                      href="#"
                      className="dropdown-toggle d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      <ImageWithBasePath
                        src="assets/img/flags/us-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                      ENG
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/us-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ENG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/arab-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ARA
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/france-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          FRE
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown mb-2 me-3">
                    <Link
                      href="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="fav-dropdown mb-2">
                    <Link href={routes.wishlist} className="position-relative">
                      <i className="isax isax-heart" />
                      <span className="count-icon bg-secondary text-gray-9">
                        0
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {location.pathname === "/index-6" && (
          <div className="header-topbar topbar-four text-center bg-transparent">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap">
                  <p className="d-flex align-items-center fs-14 mb-2 me-3 ">
                    <i className="isax isax-call5 me-2" />
                    Toll Free : +1 56565 56594
                  </p>
                  <p className="mb-2 d-flex align-items-center fs-14">
                    <i className="isax isax-message-text-15 me-2" />
                    Email : info@example.com
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="dropdown flag-dropdown mb-2 me-3">
                    <Link
                      href="#"
                      className="dropdown-toggle d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      <ImageWithBasePath
                        src="assets/img/flags/us-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                      ENG
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/us-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ENG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/arab-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ARA
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/france-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          FRA
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown mb-2">
                    <Link
                      href="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {location.pathname === "/index-8" && (
          <div className="header-topbar header-top-six text-center bg-transparent">
            <div className="container">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center flex-wrap">
                  <p className="d-flex align-items-center fs-14 mb-2 me-3 ">
                    <i className="isax isax-call5 me-2" />
                    Toll Free : +1 56565 56594
                  </p>
                  <p className="mb-2 d-flex align-items-center fs-14">
                    <i className="isax isax-message-text-15 me-2" />
                    Email : info@example.com
                  </p>
                </div>
                <div className="navbar-logo mb-2">
                  <Link className="logo-dark header-logo" href={routes.allService1}>
                    <ImageWithBasePath
                      src="assets/img/logo-dark.svg"
                      className="logo"
                      alt="Logo"
                    />
                  </Link>
                  <Link className="logo-white header-logo" href={routes.allService1}>
                    <ImageWithBasePath
                      src="assets/img/logo.svg"
                      className="logo"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className="d-flex align-items-center">
                  <div className="dropdown mb-2 me-3">
                    <Link
                      href="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <DarkButton />
                  <div className="fav-dropdown  me-3">
                    <Link href={routes.wishlist} className="position-relative">
                      <i className="isax isax-heart" />
                      <span className="count-icon bg-secondary text-gray-9">
                        0
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="#"
                      className="text-white btn btn-dark w-100 mb-2"
                      data-bs-toggle="modal"
                      data-bs-target="#login-modal"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {location.pathname === "/index-2" && (
          <div className="header-topbar topbar-four topbar-nine text-center">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex align-items-center">
                  <div className="dropdown flag-dropdown me-3 mt-1">
                    <Link
                      href="#"
                      className="dropdown-toggle d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <ImageWithBasePath
                        src="assets/img/flags/us-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                      ENG
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/us-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ENG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/arab-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ARA
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          href="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/france-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          FRA
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown">
                    <Link
                      href="#"
                      className="dropdown-toggle p-2 py-1 rounded-pill fs-12 fw-medium"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" href="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  <p className="d-flex align-items-center fs-14 mb-0 me-3 ">
                    <i className="isax isax-call5 me-2" />
                    Toll Free : +1 56565 56594
                  </p>
                  <p className="mb-0 d-flex align-items-center fs-14">
                    <i className="isax isax-message-text-15 me-2" />
                    Email : info@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* /Header Topbar*/}
        {/* Header */}
        <header
          className={`${scrolled ? "fixed" : ""} ${location.pathname === "/index-1" && "header-eight"} ${location.pathname === "/index-2" && "header-nine header-four"}
          ${location.pathname === "/index-4" || (location.pathname === "/index-9" && "header-four")} 
          ${location.pathname === "/index-5" && "header-three"} ${location.pathname === "/index-6" && "header-four"} 
          ${location.pathname === "/index-7" && "header-five"} ${location.pathname === "/index-8" && "header-six"} 
          ${location.pathname === "/index-9" && "header-seven"} ${location.pathname === "/index-10" && "header-ten"} 
          ${location.pathname === "/index-11" && "header-eleven"} ${location.pathname === "/index-12" && "header-eight header-twelve"}`}
        >
          <div
            className={` ${location.pathname === "/index-1" || location.pathname === "/index-10" || location.pathname === "/index-2" || location.pathname === "/index-6" || location.pathname === "/index-11" || location.pathname === "/index-12" ? "container-fluid" : "container"}`}
          >
            <div className={`offcanvas-info ${isOffcanva ? "show" : ""}`}>
              <div className="offcanvas-wrap">
                <div className="offcanvas-detail">
                  <div className="offcanvas-head">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Link href={routes.allService1} className="black-logo-responsive">
                        <ImageWithBasePath
                          src="assets/img/logo-dark.svg"
                          alt="logo-img"
                        />
                      </Link>
                      <Link href={routes.allService1} className="white-logo-responsive">
                        <ImageWithBasePath
                          src="assets/img/logo.svg"
                          alt="logo-img"
                        />
                      </Link>
                      <div
                        className="offcanvas-close"
                        onClick={() => setIsOffcanva(false)}
                      >
                        <i className="ti ti-x" />
                      </div>
                    </div>
                    <div className="wishlist-info d-flex justify-content-between align-items-center">
                      <h6 className="fs-16 fw-medium">Wishlist</h6>
                      <div className="d-flex align-items-center">
                        <div className="fav-dropdown">
                          <Link
                            href={routes.wishlist}
                            className="position-relative"
                          >
                            <i className="isax isax-heart" />
                            <span className="count-icon bg-secondary text-gray-9">
                              0
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mobile-menu fix mb-3 ${isResponsive ? "mean-container" : ""}`}
                  >
                    <div className="mean-bar">
                      <nav className="mean-nav">
                        <ul className="main-nav" style={{ display: "none" }}>
                          {sideBar.map((mainMenus, i) => (
                            <React.Fragment key={i}>
                              {mainMenus.separateRoute ? (
                                <li
                                  className={`has-submenu megamenu active ${isDropdownOpen ? "dropdown-opened" : ""
                                    }`}
                                >
                                  <Link href="#" onClick={openSubMenu}>
                                    {mainMenus.tittle}

                                    <i className="fa-solid fa-angle-down"></i>
                                  </Link>
                                  <ul
                                    className={`submenu mega-submenu ${mainMenus.tittle === "Home" ? "home-menu" : ""}`}
                                    style={{
                                      display: isDropdownOpen
                                        ? "block"
                                        : "none",
                                    }}
                                  >
                                    <li>
                                      <div className="megamenu-wrapper">
                                        <div className="d-none d-lg-flex align-items-center justify-content-between flex-wrap">
                                          <h6 className="mb-3">Home Pages</h6>
                                          <Link
                                            href="#"
                                            className="btn btn-dark btn-md mb-3 text-white d-inline-block w-auto"
                                          >
                                            Purchase Template
                                          </Link>
                                        </div>
                                        <div className="row">
                                          {mainMenus.menu.map(
                                            (menu: any, index: any) => (
                                              <div
                                                className="col-lg-2"
                                                key={index}
                                              >
                                                <div
                                                  className={`single-demo ${menu.base === mainMenus.base
                                                    ? "active"
                                                    : ""
                                                    }`}
                                                >
                                                  <div className="demo-img">
                                                    <Link href={menu.route}>
                                                      <ImageWithBasePath
                                                        src={menu.img}
                                                        className="img-fluid"
                                                        alt="img"
                                                      />
                                                    </Link>
                                                  </div>
                                                  <div className="demo-info">
                                                    <Link href={menu.route}>
                                                      {menu.homeName}
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <Link
                                    className={`mean-expand ${isDropdownOpen ? "mean-clicked" : ""
                                      }`}
                                    href="#"
                                    aria-label={t("expandMenu")}
                                    style={{ fontSize: "18px" }}
                                    onClick={openSubMenu}
                                  >
                                    <i className="ti ti-plus"></i>
                                  </Link>
                                </li>
                              ) : mainMenus.standalone ? (
                                <li
                                  className={`${location.pathname.includes('contact-us') && "active"}`}
                                >
                                  <Link href={routes.contactUs}>
                                    {mainMenus.tittle}
                                  </Link>
                                </li>
                              ) : (
                                <>
                                  {mainMenus.tabMenu ? (
                                    <li
                                      className={`has-submenu megamenutab ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""}`}
                                      onClick={() => toggleSubMenu(7)}
                                    >
                                      <Link href="#">
                                        {mainMenus.tittle}
                                        <i className="fa-solid fa-angle-down"></i>
                                      </Link>
                                      <ul className="submenu mega-submenu" style={{
                                        display:
                                          openDropdownIndex === 7
                                            ? "block"
                                            : "none",
                                      }}>
                                        <li>
                                          <div className="megamenu-wrapper">
                                            <div className="row">
                                              <div className="col-lg-3">
                                                <div
                                                  className="nav flex-column nav-pills menu-tab"
                                                  id="menu-tab"
                                                  role="tablist"
                                                  aria-orientation="vertical"
                                                >
                                                  <ul>
                                                    {mainMenus.menu.map(
                                                      (menu: any, idx: any) => (
                                                        <li key={idx}>
                                                          <Link
                                                            className={`nav-link ${menu.showtab ? "active" : ""}`}
                                                            id="activity-tab"
                                                            data-bs-toggle="tab"
                                                            href={`#${menu.id2}`}
                                                            role="tab"
                                                            onClick={(e) => e.stopPropagation()}
                                                          >
                                                            {menu.title}
                                                          </Link>
                                                        </li>
                                                      ),
                                                    )}
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="col-lg-9">
                                                <div
                                                  className="tab-content tab-menulist"
                                                  id="menu-tabContent"
                                                >
                                                  {mainMenus.menu.map(
                                                    (menu: any, idx: any) => (
                                                      <div
                                                        className={`tab-pane fade ${menu.showtab ? "show active" : ""}`}
                                                        id={menu.id2}
                                                        role="tabpanel"
                                                        key={idx}
                                                      >
                                                        {menu.title ===
                                                          "Pages" && (
                                                            <h6>{menu.title}</h6>
                                                          )}
                                                        <div className="row">
                                                          <div className="col-lg-6">
                                                            { }
                                                            {menu.title !==
                                                              "Pages" && (
                                                                <h6>
                                                                  {menu.title}
                                                                </h6>
                                                              )}
                                                            <ul>
                                                              {menu.subMenus
                                                                .filter(
                                                                  (
                                                                    subMenu: any,
                                                                  ) =>
                                                                    subMenu &&
                                                                    subMenu.menuValue &&
                                                                    subMenu.menuValue.trim() !==
                                                                    "",
                                                                )
                                                                .map(
                                                                  (
                                                                    subMenu: any,
                                                                    idx: number,
                                                                  ) => (
                                                                    <li
                                                                      key={idx}
                                                                    >
                                                                      <Link
                                                                        href={
                                                                          subMenu.route
                                                                        }
                                                                      >
                                                                        {
                                                                          subMenu.menuValue
                                                                        }
                                                                      </Link>
                                                                    </li>
                                                                  ),
                                                                )}
                                                            </ul>
                                                          </div>
                                                          <div className="col-lg-6">
                                                            {menu.img ? (
                                                              <div className="menu-img">
                                                                <ImageWithBasePath
                                                                  src={menu.img}
                                                                  alt="img"
                                                                  className="img-fluid"
                                                                />
                                                              </div>
                                                            ) : (
                                                              <>
                                                                {menu.title2 && (
                                                                  <h6>
                                                                    {
                                                                      menu.title2
                                                                    }
                                                                  </h6>
                                                                )}
                                                                <ul>
                                                                  {menu.subMenus
                                                                    .filter(
                                                                      (
                                                                        subMenu: any,
                                                                      ) =>
                                                                        subMenu &&
                                                                        subMenu.menuValue2 &&
                                                                        subMenu.menuValue2.trim() !==
                                                                        "",
                                                                    )
                                                                    .map(
                                                                      (
                                                                        subMenu: any,
                                                                        idx: number,
                                                                      ) => (
                                                                        <li
                                                                          key={
                                                                            idx
                                                                          }
                                                                        >
                                                                          <Link
                                                                            href={
                                                                              subMenu.route
                                                                            }
                                                                          >
                                                                            {
                                                                              subMenu.menuValue2
                                                                            }
                                                                          </Link>
                                                                        </li>
                                                                      ),
                                                                    )}
                                                                </ul>
                                                              </>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ),
                                                  )}
                                                </div>
                                              </div>


                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                      <Link className="mean-expand" href="#" aria-label={t("expandMenu")}><i className="ti ti-plus"></i></Link>
                                    </li>
                                  ) : (
                                    <li
                                      className={`has-submenu mega-innermenu ${openDropdownIndex === i
                                        ? "dropdown-opened"
                                        : ""
                                        }`}
                                    >
                                      <Link
                                        href="#"
                                        onClick={() => toggleSubMenu(i)}
                                      >
                                        {mainMenus.tittle}
                                        <i className="fa-solid fa-angle-down"></i>
                                      </Link>
                                      <ul
                                        className="submenu mega-submenu"
                                        style={{
                                          display:
                                            openDropdownIndex === i
                                              ? "block"
                                              : "none",
                                        }}
                                      >
                                        <li>
                                          <div className="megamenu-wrapper">
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <h6>{mainMenus.tittle}</h6>
                                                <ul>
                                                  {mainMenus.menu.map(
                                                    (menu: any, index: any) => (
                                                      <React.Fragment
                                                        key={index}
                                                      >
                                                        {!mainMenus.tabMenu && (
                                                          <li>
                                                            <Link
                                                              href={
                                                                menu.route
                                                              }
                                                            >
                                                              {menu.menuValue}
                                                            </Link>
                                                          </li>
                                                        )}
                                                        {mainMenus.tabMenu &&
                                                          menu.menuValue && (
                                                            <li>
                                                              <Link
                                                                href={
                                                                  menu.route
                                                                }
                                                              >
                                                                {menu.menuValue}
                                                              </Link>
                                                            </li>
                                                          )}
                                                        {mainMenus.tabMenu &&
                                                          menu.menuValue2 && (
                                                            <li>
                                                              <Link
                                                                href={
                                                                  menu.route
                                                                }
                                                              >
                                                                {
                                                                  menu.menuValue2
                                                                }
                                                              </Link>
                                                            </li>
                                                          )}
                                                      </React.Fragment>
                                                    ),
                                                  )}
                                                </ul>
                                                <Link
                                                  className="mean-expand"
                                                  href="#"
                                                  aria-label={t("expandMenu")}
                                                  style={{ fontSize: "18px" }}
                                                >
                                                  <i className="ti ti-plus"></i>
                                                </Link>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="menu-img">
                                                  <ImageWithBasePath
                                                    src={mainMenus?.img || ""}
                                                    alt="img"
                                                    className="img-fluid"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                      <Link
                                        className={`mean-expand ${openDropdownIndex === i
                                          ? "mean-clicked"
                                          : ""
                                          }`}
                                        href="#"
                                        aria-label={t("expandMenu")}
                                        style={{ fontSize: "18px" }}
                                        onClick={() => toggleSubMenu(i)}
                                      >
                                        <i className="ti ti-plus"></i>
                                      </Link>
                                    </li>
                                  )}
                                </>
                              )}
                            </React.Fragment>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="offcanvas__contact">
                    <div className="mt-4">
                      <div className="header-dropdown d-flex flex-fill">
                        <div className="w-100">
                          <div className="dropdown flag-dropdown mb-2">
                            <Link
                              href="#"
                              className="dropdown-toggle bg-white border d-flex align-items-center"
                              data-bs-toggle="dropdown"
                            >
                              <ImageWithBasePath
                                src="assets/img/flags/us-flag.svg"
                                className="me-2"
                                alt="flag"
                              />
                              ENG
                            </Link>
                            <ul className="dropdown-menu p-2">
                              <li>
                                <Link
                                  className="dropdown-item rounded d-flex align-items-center"
                                  href="#"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/flags/us-flag.svg"
                                    className="me-2"
                                    alt="flag"
                                  />
                                  ENG
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item rounded d-flex align-items-center"
                                  href="#"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/flags/arab-flag.svg"
                                    className="me-2"
                                    alt="flag"
                                  />
                                  ARA
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="dropdown-item rounded d-flex align-items-center"
                                  href="#"
                                >
                                  <ImageWithBasePath
                                    src="assets/img/flags/france-flag.svg"
                                    className="me-2"
                                    alt="flag"
                                  />
                                  FRE
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown">
                            <Link
                              href="#"
                              className="dropdown-toggle bg-white border d-block"
                              data-bs-toggle="dropdown"
                            >
                              USD
                            </Link>
                            <ul className="dropdown-menu p-2">
                              <li>
                                <Link className="dropdown-item rounded" href="#">
                                  USD
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item rounded" href="#">
                                  YEN
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item rounded" href="#">
                                  EURO
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Link
                          href="#"
                          className="text-white btn btn-dark w-100 mb-3"
                          data-bs-toggle="modal"
                          data-bs-target="#login-modal"
                        >
                          Sign In
                        </Link>
                      </div>
                      <Link
                        href={routes.becomeAnExpert}
                        className="btn btn-primary w-100"
                      >
                        Become Expert
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`offcanvas-overlay ${isOffcanva ? "overlay-open" : ""}`}
              onClick={() => setIsOffcanva(false)}
            />
            <div className="header-nav">
              <div className="main-menu-wrapper">
                <div className="navbar-logo">
                  <Link className="logo-white header-logo" href={routes.allService1}>
                    {location.pathname === "/index-4" ||
                      location.pathname === "/index-2" ||
                      location.pathname === "/index-5" ||
                      location.pathname === "/index-6" ||
                      location.pathname === "/index-7" ? (
                      <ImageWithBasePath
                        src="assets/img/logo-dark.svg"
                        className="logo"
                        alt="Logo"
                      />
                    ) : location.pathname === "/index-10" ? (
                      <ImageWithBasePath
                        src="assets/img/logo-10.svg"
                        className="logo"
                        alt="Logo"
                      />
                    ) : (
                      <ImageWithBasePath
                        src="assets/img/logo.svg"
                        className="logo"
                        alt="Logo"
                      />
                    )}
                  </Link>
                  {location.pathname !== routes.home6 && (
                    <Link className="logo-dark header-logo" href={routes.allService1}>
                      {location.pathname === "/index-4" ||
                        location.pathname === "/index-2" ||
                        location.pathname === "/index-5" ||
                        location.pathname === "/index-6" ||
                        location.pathname === "/index-7" ||
                        location.pathname === "/index-9" ? (
                        <ImageWithBasePath
                          src="assets/img/logo.svg"
                          className="logo"
                          alt="Logo"
                        />
                      ) : (
                        <ImageWithBasePath
                          src="assets/img/logo-dark.svg"
                          className="logo"
                          alt="Logo"
                        />
                      )}
                    </Link>
                  )}
                </div>
                <nav id="mobile-menu">
                  <ul className={`main-nav ${isMegaMenu ? "active" : ""}`}>
                    {sideBar.map((mainMenus: any, index) => (
                      <React.Fragment key={index}>
                        {mainMenus.separateRoute ? (
                          <li
                            className={`has-submenu megamenu ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""}`}
                            onMouseOver={() => setIsMegaMenu(true)}
                            onMouseLeave={() => setIsMegaMenu(false)}
                          >
                            <Link href="#">
                              {mainMenus.tittle}
                              <i className="fa-solid fa-angle-down"></i>
                            </Link>
                            <ul
                              className={`submenu mega-submenu ${mainMenus.tittle === "Home" ? "home-menu" : ""}`}
                              onMouseOver={() => setIsMegaMenu(true)}
                              onMouseLeave={() => setIsMegaMenu(false)}
                            >
                              <li>
                                <div className="megamenu-wrapper">
                                  <div className="d-none d-lg-flex align-items-center justify-content-between flex-wrap">
                                    <h6 className="mb-3">Home Pages</h6>
                                    <Link
                                      href="#"
                                      className="btn btn-dark btn-md mb-3 text-white d-inline-block w-auto"
                                    >
                                      Purchase Template
                                    </Link>
                                  </div>
                                  <div className="row g-lg-4">
                                    {mainMenus.menu.map(
                                      (menu: any, idx: any) => (
                                        <div className="col-lg-2" key={idx}>
                                          <div
                                            className={`single-demo ${location.pathname === menu.route ? "active" : ""}`}
                                          >
                                            <div className="demo-img">
                                              <Link href={menu.route}>
                                                <ImageWithBasePath
                                                  src={menu.img}
                                                  className="img-fluid"
                                                  alt="img"
                                                />
                                              </Link>
                                            </div>
                                            <div className="demo-info">
                                              <Link href={menu.route} className={`${location.pathname === menu.route ? "active" : ""}`}>
                                                {menu.homeName}
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                        ) : mainMenus.standalone ? (
                          <li
                            className={`${location.pathname.includes('contact-us') && "active"}`}
                          >
                            <Link href={routes.contactUs}>
                              {mainMenus.tittle}
                            </Link>
                          </li>
                        ) : (
                          <>
                            {mainMenus.tabMenu ? (
                              <li
                                className={`has-submenu megamenutab ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""} 
                                ${location.pathname.includes('activity') || location.pathname.includes('visa') || location.pathname.includes('guide') || location.pathname.includes('pages') || location.pathname.includes('user') || location.pathname.includes('agent') ? 'active' : ''}`}
                              >
                                <Link href="#">
                                  {mainMenus.tittle}
                                  <i className="fa-solid fa-angle-down"></i>
                                </Link>
                                <ul className="submenu mega-submenu">
                                  <li>
                                    <div className="megamenu-wrapper">
                                      <div className="row">
                                        <div className="col-lg-3">
                                          <div
                                            className="nav flex-column nav-pills menu-tab"
                                            id="menu-tab"
                                            role="tablist"
                                            aria-orientation="vertical"
                                          >
                                            <ul>
                                              {mainMenus.menu.map(
                                                (menu: any, idx: any) => (
                                                  <li key={idx}>
                                                    <Link
                                                      className={`nav-link ${menu.showtab ? "active" : ""}`}
                                                      id="activity-tab"
                                                      data-bs-toggle="tab"
                                                      href={`#${menu.id}`}
                                                      role="tab"
                                                    >
                                                      {menu.title}
                                                    </Link>
                                                  </li>
                                                ),
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="col-lg-9">
                                          <div
                                            className="tab-content tab-menulist"
                                            id="menu-tabContent"
                                          >
                                            {mainMenus.menu.map(
                                              (menu: any, idx: any) => (
                                                <div
                                                  className={`tab-pane fade ${menu.showtab ? "show active" : ""}`}
                                                  id={menu.id}
                                                  role="tabpanel"
                                                  key={idx}
                                                >
                                                  {menu.title === "Pages" && (
                                                    <h6>{menu.title}</h6>
                                                  )}
                                                  <div className="row">
                                                    <div className="col-lg-6">
                                                      { }
                                                      {menu.title !==
                                                        "Pages" && (
                                                          <h6>{menu.title === 'Dashboard' ? 'User Dashboard' : menu.title}</h6>
                                                        )}
                                                      <ul>
                                                        {menu.subMenus
                                                          .filter(
                                                            (subMenu: any) =>
                                                              subMenu &&
                                                              subMenu.menuValue &&
                                                              subMenu.menuValue.trim() !==
                                                              "",
                                                          )
                                                          .map(
                                                            (
                                                              subMenu: any,
                                                              idx: number,
                                                            ) => (
                                                              <li key={idx} className={`${location.pathname === subMenu.route ? 'active' : ''}`}>
                                                                <Link
                                                                  href={
                                                                    subMenu.route
                                                                  }
                                                                >
                                                                  {
                                                                    subMenu.menuValue
                                                                  }
                                                                </Link>
                                                              </li>
                                                            ),
                                                          )}
                                                      </ul>
                                                    </div>
                                                    <div className="col-lg-6">
                                                      {menu.img ? (
                                                        <div className="menu-img">
                                                          <ImageWithBasePath
                                                            src={menu.img}
                                                            alt="img"
                                                            className="img-fluid"
                                                          />
                                                        </div>
                                                      ) : (
                                                        <>
                                                          {menu.title2 && (
                                                            <h6>
                                                              {menu.title2}
                                                            </h6>
                                                          )}
                                                          <ul>
                                                            {menu.subMenus
                                                              .filter(
                                                                (
                                                                  subMenu: any,
                                                                ) =>
                                                                  subMenu &&
                                                                  subMenu.menuValue2 &&
                                                                  subMenu.menuValue2.trim() !==
                                                                  "",
                                                              )
                                                              .map(
                                                                (
                                                                  subMenu: any,
                                                                  idx: number,
                                                                ) => (
                                                                  <li
                                                                    key={idx}
                                                                    className={
                                                                      location.pathname ===
                                                                        subMenu.route
                                                                        ? "active"
                                                                        : ""
                                                                    }
                                                                  >
                                                                    <Link
                                                                      href={
                                                                        subMenu.route
                                                                      }
                                                                    >
                                                                      {
                                                                        subMenu.menuValue2
                                                                      }
                                                                    </Link>
                                                                  </li>
                                                                ),
                                                              )}
                                                          </ul>
                                                        </>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>

                                        {/* <div className="col-lg-9">
                                          <h6>{mainMenus.subTitle}</h6>
                                          <ul>
                                            {mainMenus.menu.map((menu: { menuValue: any, route: string; }, idx: React.Key | null | undefined) => (
                                              menu.menuValue &&
                                              <li key={idx} className={location.pathname === menu.route ? 'active' : ''}>
                                                <Link href={menu.route}>{menu.menuValue}</Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div className="col-lg-6">
                                          <h6>{mainMenus.subTitle2}</h6>
                                          <ul>
                                            {mainMenus.menu.map((menu: { menuValue2: any, route: string; }, idx: React.Key | null | undefined) => (
                                              menu.menuValue2 &&
                                              <li key={idx} className={location.pathname === menu.route ? 'active' : ''}>
                                                <Link href={menu.route}>{menu.menuValue2}</Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div> */}
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            ) : (
                              <li
                                className={`has-submenu mega-innermenu ${mainMenus?.menu?.some((item: any) => item?.route?.includes(location.pathname)) ? "active" : ""}`}
                              >
                                <Link href="#">
                                  {mainMenus.tittle}
                                  <i className="fa-solid fa-angle-down"></i>
                                </Link>
                                <ul className="submenu mega-submenu">
                                  <li>
                                    <div className="megamenu-wrapper">
                                      <div className="row">
                                        <div className="col-lg-6">
                                          <h6>{mainMenus.subTitle}</h6>
                                          <ul>
                                            {mainMenus.menu.map(
                                              (
                                                menu: {
                                                  menuValue: string;
                                                  route: string;
                                                },
                                                idx:
                                                  | React.Key
                                                  | null
                                                  | undefined,
                                              ) => (
                                                <li
                                                  key={idx}
                                                  className={
                                                    location.pathname ===
                                                      menu.route
                                                      ? "active"
                                                      : ""
                                                  }
                                                >
                                                  <Link href={menu.route}>
                                                    {menu.menuValue}
                                                  </Link>
                                                </li>
                                              ),
                                            )}
                                          </ul>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="menu-img">
                                            <ImageWithBasePath
                                              src={mainMenus.img}
                                              className="img-fluid"
                                              alt="img"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </li>
                            )}
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </nav>
                {location.pathname === "/index-1" ? (
                  <div className="header-btn d-flex align-items-center">
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link
                        href={all_routes.wishlist}
                        className="position-relative text-white wishlist-icon"
                      >
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-white">
                          0
                        </span>
                      </Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link
                        href="#"
                        className="text-white btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#login-modal"
                      >
                        <i className="isax isax-lock5 me-1" />
                        Login
                      </Link>
                      <Link href="#" className="text-white btn btn-dark w-100">
                        <i className="isax isax-user-minus me-1" />
                        Register
                      </Link>
                    </div>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-2" ? (
                  <div className="header-btn d-flex align-items-center">
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link
                        href={all_routes.wishlist}
                        className="position-relative wishlist-icon"
                      >
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-gray-9">
                          0
                        </span>
                      </Link>
                    </div>
                    <Link
                      href="#"
                      className="btn btn-primary d-inline-flex align-items-center me-2"
                    >
                      <i className="isax isax-lock5 me-2" />
                      Login
                    </Link>
                    <Link
                      href={all_routes.register}
                      className="btn btn-dark d-inline-flex align-items-center me-0"
                    >
                      <i className="isax isax-profile-remove5 me-2" />
                      Register
                    </Link>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-3" ? (
                  <div className="header-btn d-flex align-items-center">
                    <DarkButton />
                    <div>
                      <Link
                        href="#"
                        className="btn btn-white me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#login-modal"
                      >
                        Sign In
                      </Link>
                    </div>
                    <Link
                      href={routes.becomeAnExpert}
                      className="btn btn-primary me-0"
                    >
                      Become Expert
                    </Link>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div
                        className="sidebar-menu"
                        onClick={() => setIsOffcanva(true)}
                      >
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-4" ? (
                  <div className="header-btn d-flex align-items-center">
                    <div className="dropdown flag-dropdown me-3">
                      <Link
                        href="#"
                        className="d-inline-flex align-items-center"
                        data-bs-toggle="dropdown"
                      >
                        <ImageWithBasePath
                          src="assets/img/flags/us-flag.svg"
                          alt="flag"
                        />
                      </Link>
                      <ul className="dropdown-menu p-2 mt-2">
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/us-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            ENG
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/arab-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            ARA
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/france-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            FRE
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown me-3">
                      <Link
                        href="#"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        USD
                      </Link>
                      <ul className="dropdown-menu p-2 mt-2">
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            USD
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            YEN
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            EURO
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="me-3">
                      <Link href={routes.userDashboard}>
                        <i className="isax isax-user" />
                      </Link>
                    </div>
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link href={routes.wishlist} className="position-relative">
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-gray-9">
                          0
                        </span>
                      </Link>
                    </div>
                    <Link
                      href={routes.becomeAnExpert}
                      className="btn btn-primary"
                    >
                      Become Expert
                    </Link>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div
                        className="sidebar-menu"
                        onClick={() => setIsOffcanva(true)}
                      >
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-5" ? (
                  <div className="header-btn d-flex align-items-center">
                    <div className="cart-dropdown me-3">
                      <Link
                        href={routes.userDashboard}
                        className="position-relative"
                      >
                        <i className="isax isax-user" />
                      </Link>
                    </div>
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link href={routes.wishlist} className="position-relative">
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-gray-9">
                          0
                        </span>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#"
                        className="text-white fs-13 btn btn-dark btn-md"
                        data-bs-toggle="modal"
                        data-bs-target="#login-modal"
                      >
                        Sign In
                      </Link>
                    </div>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div
                        className="sidebar-menu"
                        onClick={() => setIsOffcanva(true)}
                      >
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-6" ? (
                  <>
                    <div className="header-btn d-flex align-items-center">
                      <DarkButton />
                      <div className="fav-dropdown me-3">
                        <Link
                          href={routes.wishlist}
                          className="position-relative"
                        >
                          <i className="isax isax-heart" />
                          <span className="count-icon bg-secondary text-gray-9">
                            0
                          </span>
                        </Link>
                      </div>
                      <Link
                        href={routes.addFlight}
                        className="btn btn-dark d-inline-flex align-items-center me-2"
                      >
                        <i className="isax isax-lock me-2" />
                        Add Your Listing
                      </Link>
                      <Link
                        href={routes.register}
                        className="btn btn-dark d-inline-flex align-items-center me-0"
                      >
                        <i className="isax isax-lock me-2" />
                        Sign Up
                      </Link>
                      <div className="header__hamburger d-xl-none my-auto">
                        <div
                          className="sidebar-menu"
                          onClick={() => setIsOffcanva(true)}
                        >
                          <i className="isax isax-menu5" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : location.pathname === "/index-7" ? (
                  <div className="header-btn d-flex align-items-center">
                    <div className="cart-dropdown me-3">
                      <Link
                        href={routes.userDashboard}
                        className="position-relative"
                      >
                        <i className="isax isax-user" />
                      </Link>
                    </div>
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link href={routes.wishlist} className="position-relative">
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-gray-9">
                          0
                        </span>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="#"
                        className="text-white btn btn-dark w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#login-modal"
                      >
                        Sign In
                      </Link>
                    </div>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div
                        className="sidebar-menu"
                        onClick={() => setIsOffcanva(true)}
                      >
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-8" ? (
                  <div className="header__hamburger d-xl-none my-auto">
                    <div
                      className="sidebar-menu"
                      onClick={() => setIsOffcanva(true)}
                    >
                      <i className="isax isax-menu5" />
                    </div>
                  </div>
                ) : location.pathname === "/index-9" ? (
                  <div className="header-btn d-flex align-items-center">
                    <div className="dropdown me-3">
                      <Link
                        href="#"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        USD
                      </Link>
                      <ul className="dropdown-menu p-2 mt-2" style={{}}>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            USD
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            YEN
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            EURO
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown flag-dropdown me-3">
                      <Link
                        href="#"
                        className="d-inline-flex align-items-center"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <ImageWithBasePath
                          src="assets/img/flags/us-flag.svg"
                          alt="flag"
                        />
                      </Link>
                      <ul className="dropdown-menu p-2 mt-2">
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/us-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            ENG
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/arab-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            ARA
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/france-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            FRE
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <DarkButton />
                    <Link href={routes.login} className="btn btn-primary">
                      Login
                    </Link>
                    <Link href={routes.register} className="btn btn-dark">
                      Register
                    </Link>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-10" ? (
                  <div className="header-btn d-flex align-items-center">
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link
                        href={routes.wishlist}
                        className="position-relative text-white wishlist-icon fs-24"
                      >
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-white">
                          0
                        </span>
                      </Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link
                        href="#"
                        className="text-white btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#login-modal"
                      >
                        <i className="isax isax-lock5 me-1" />
                        Login
                      </Link>
                      <Link href="#" className="text-white btn btn-dark w-100">
                        <i className="isax isax-user-minus me-1" />
                        Register
                      </Link>
                    </div>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-11" ? (
                  <div className="header-btn d-flex align-items-center">
                    <div className="dropdown flag-dropdown flag-dropdown-desktop me-2 d-none d-lg-flex">
                      <Link
                        href="#"
                        className="dropdown-toggle d-inline-flex align-items-center"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <ImageWithBasePath
                          src="assets/img/flags/us-flag.svg"
                          alt="flag"
                        />
                      </Link>
                      <ul className="dropdown-menu p-2 mt-2">
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/us-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            ENG
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/arab-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            ARA
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item rounded d-flex align-items-center"
                            href="#"
                          >
                            <ImageWithBasePath
                              src="assets/img/flags/france-flag.svg"
                              className="me-2"
                              alt="flag"
                            />
                            FRE
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown me-2 d-none d-lg-block">
                      <Link
                        href="#"
                        className="dropdown-toggle p-2 rounded-pill fs-12 fw-medium"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        USD
                      </Link>
                      <ul className="dropdown-menu p-2 mt-2">
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            USD
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            YEN
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded" href="#">
                            EURO
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="me-3">
                      <Link href="#">
                        <i className="isax isax-user" />
                      </Link>
                    </div>
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link
                        href={all_routes.wishlist}
                        className="position-relative wishlist-icon"
                      >
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-dark">
                          0
                        </span>
                      </Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link
                        href={all_routes.becomeAnExpert}
                        className="text-white btn btn-primary w-100"
                      >
                        Become Expert
                      </Link>
                    </div>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : location.pathname === "/index-12" ? (
                  <div className="header-btn d-flex align-items-center">
                    <DarkButton />
                    <div className="fav-dropdown me-3">
                      <Link
                        href={all_routes.wishlist}
                        className="position-relative wishlist-icon"
                      >
                        <i className="isax isax-heart" />
                        <span className="count-icon bg-secondary text-white">
                          0
                        </span>
                      </Link>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link
                        href={all_routes.login}
                        className="text-white btn btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#login-modal"
                      >
                        <i className="isax isax-lock5 me-1" />
                        Login
                      </Link>
                      <Link
                        href={all_routes.register}
                        className="text-white btn btn-dark w-100"
                      >
                        <i className="isax isax-user-minus me-1" />
                        Register
                      </Link>
                    </div>
                    <div className="header__hamburger d-xl-none my-auto">
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="header-btn d-flex align-items-center">
                    <DarkButton />
                    <div className="dropdown profile-dropdown">
                      <Link
                        href="#"
                        className="d-flex align-items-center"
                        data-bs-toggle="dropdown"
                      >
                        <span className="avatar avatar-md">
                          <ImageWithBasePath
                            src="assets/img/users/user-05.jpg"
                            alt="Img"
                            className="img-fluid rounded-circle border border-white border-4"
                          />
                        </span>
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li>
                          <Link
                            className="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2"
                            href={routes.userDashboard}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2"
                            href={routes.customerHotelBooking}
                          >
                            My Booking
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2"
                            href={routes.userMyProfile}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider my-2" />
                        </li>
                        <li>
                          <Link
                            className="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2"
                            href={routes.userProfileSettings}
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item d-inline-flex align-items-center rounded fw-medium p-2"
                            href={routes.login}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <Link
                      href={
                        location.pathname.includes("cruise")
                          ? all_routes.addCruise
                          : location.pathname.includes("tour")
                            ? all_routes.addTour
                            : location.pathname.includes("flight")
                              ? all_routes.addFlight
                              : location.pathname.includes("car")
                                ? all_routes.addCar
                                : location.pathname.includes("activity")
                                  ? all_routes.addActivity
                                  : location.pathname.includes("visa")
                                    ? all_routes.addVisa
                                    : location.pathname.includes("guide")
                                      ? all_routes.addGuide
                                      : all_routes.addHotel
                      }
                      className="btn btn-primary me-0"
                    >
                      Add Listing
                    </Link>
                    <div
                      className="header__hamburger d-xl-none my-auto"
                      onClick={() => setIsOffcanva(true)}
                    >
                      <div className="sidebar-menu">
                        <i className="isax isax-menu5" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* /Header */}
      </div>
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <ChangePasswordModal />
    </>
  );
};

export default Header;
