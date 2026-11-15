
export const all_routes = {
    //Home

    allService1: "/index-1", // all service 1
    allService2: "/index-2", // all service 1
    home1: "/index-3", // all service 3
    home2: "/index-4", // hotels
    home3: "/index-5", // cars
    home4: "/index-6", // flight
    home5: "/index-7", // cruise
    home6: "/index-8", // tour
    home7: "/index-9", // bus
    home10: "/index-10", // Guide
    home11: "/index-11", // activity
    home12: "/index-12", // visa

    // auth routes routes
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    changepassword: "/change-password",

    //Flight
    addFlight: "/flight/add-flight",
    flightGrid: "/flights",
    flightList: "/flight/flight-list",
    flightDetails: "/flight/flight-details",
    flightBooking: "/flight/flight-booking",
    flightBookingConfirmation: "/flight/flight-booking-confirmation",
    flightSeatSelection: "/flight/flight-seat-selection",


    //Hotel
    addHotel: "/hotel/add-hotel",
    hotelGrid: "/hotels",
    hotelList: "/hotel/hotel-list",
    hotelMap: "/hotel/hotel-map",
    hotelDetails: "/hotel/hotel-details",
    hotelBooking: "/hotel/hotel-booking",
    hotelBookingConfirmation: "/hotel/hotel-booking-confirmation",
    hotelRoomSelection: "/hotel/hotel-room-selection",

    //Car
    addCar: "/car/add-car",
    carGrid: "/car/car-grid",
    carList: "/car/car-list",
    carMap: "/car/car-map",
    carDetails: "/car/car-details",
    carBooking: "/car/car-booking",
    carBookingConfirmation: "/car/car-booking-confirmation",

    //cruise
    addCruise: "/cruise/add-cruise",
    cruiseGrid: "/cruise/cruise-grid",
    cruiseList: "/cruise/cruise-list",
    cruiseDetails: "/cruise/cruise-details",
    cruiseBookingConfirmation: "/cruise/cruise-booking-confirmation",
    cruiseBooking: "/cruise/cruise-booking",
    cruiseMap: "/cruise/cruise-map",
    cruiseCabinSelection: "/cruise/cruise-cabin-selection",
    //tour
    addTour: "/tour/add-tour",
    editTour: "/tour/edit-tour",
    tourGrid: "/tours",
    tourList: "/tour/tour-list",
    tourMap: "/tour/tour-map",
    tourBooking: "/tour/tour-booking",
    tourBookingConfirmation: "/tour/tour-bookingConfirmation",
    tourDetails: "/tour/tour-details",
    customPackageBuilder: "/tour/custom-package-builder",

    //bus
    busList: "/bus/bus-list",
    busLeftSidebar: "/bus/bus-left-sidebar",
    busRightSidebar: "/bus/bus-right-sidebar",
    busDetails: "/bus/bus-details",
    busBooking: "/bus/bus-booking",
    addBus: "/bus/add-bus",
    editBus: "/bus/edit-bus",
    busBookingConfirmation: "/bus/bus-booking-confirmation",
    busSeatSelection: "/bus/bus-seat-selection",

    //Activity
    activityGrid: "/activity/activity-grid",
    activityList: "/activity/activity-list",
    activityMap: "/activity/activity-map",
    addActivity: "/activity/add-activity",
    activityDetails: "/activity/activity-details",
    activityBooking: "/activity/activity-booking",
    activityBookingConfirmation: "/activity/activity-booking-confirmation",
    editActivity:"/activity/edit-activity",

    //Visa
    visaList: "/visa/visa-list",
    visaGrid: "/visa",
    visaDetails: "/visa/visa-details",
    visaBookingConfirmation: "/visa/visa-booking-confirmation",
    addVisa: "/visa/add-visa",
    trackVisa: "/visa/track-visa",
    visaRequirements: "/visa/visa-requirements",
    visaApplication: "/visa/visa-application",
    visaBookingDetails: "/visa/visa-booking-details",

    //Guide
    guideGrid: "/guide/guide-grid",
    guideDetails: "/guide/guide-details",
    guideBooking: "/guide/guide-booking",
    guideBookingConfirmation: "/guide/guide-booking-confirmation",
    addGuide: "/guide/add-guide",
    guideList:"/guide/guide-list",
    editGuide:"/guide/edit-guide",

    //Agent 
    agentDashboard: "/agent/agent-dashboard",
    agentListing: "/agent/agent-listings",
    editHotel: "/hotel/edit-hotel",
    editCar: "/car/edit-car",
    editFlight: "/flight/edit-flight",
    editCruise: "/cruise/edit-cruise",
    agentHotelBooking: "/agent/agent-hotel-booking",
    agentBookingDetails: "/agent/agent-booking-details",
    agentCarBooking: "/agent/agent-car-booking",
    agentCruiseBooking: "/agent/agent-cruise-booking",
    agentTourBooking: "/agent/agent-tour-booking",
    agentFlightBooking: "/agent/agent-flight-booking",
    agentBusBooking: "/agent/agent-bus-booking",
    agentGuideBooking: "/agent/agent-guide-booking",
    agentVisaBooking: "/agent/agent-visa-booking",
    agentPaymentHistory: "/agent/agent-payment-history",
    agentPendingPayouts: "/agent/agent-pending-payouts",
    agentPayoutRequest: "/agent/agent-payout-request",
    agentCommissionSummary: "/agent/agent-commission-summary",
    agentActivitiesBooking: "/agent/agent-activities-booking",
    agentCancellationRequest: "/agent/agent-cancellation-request",
    agentEnquirers: "/agent/agent-enquirers",
    agentEarnings: "/agent/agent-earnings",
    agentReview: "/agent/agent-review",
    agentSettings: "/agent/agent-settings",
    agentBussinessDetails: "/agent/agent-bussiness-details",
    agentNotificationSettings: "/agent/agent-notification-settings",
    agentNotification: "/agent/agent-notification",
    agentChat: "/agent/agent-chat",
    agentEnquiriesDetails: "/agent/agent-enquiry-details",
    agentAccountSettings: "/agent/agent-account-settings",
    agentSecuritySettings: "/agent/agent-security-settings",
    agentPlanSettings: "/agent/agent-plans-settings",
    agentPlan: "/agent/agent-plans",




    //User DashBoard
    userDashboard: "/user/dashboard",
    userAllBookings: "/user/customer-all-bookings",
    userTripDetails: "/user/customer-trip-details",
    manageBooking: "/user/manage-booking",
    travelVoucher: "/user/travel-voucher",
    customerCancellationRefunds: "/user/customer-cancellation-refunds",
    customerInvoices: "/user/customer-invoices",


    payment: "/user/payment",
    customerHotelBooking: "/user/customer-hotel-booking",
    userMyProfile: "/user/my-profile",
    userProfileSettings: "/user/profile-settings",
    chat: "/user/chat",

    userFlightBooking: "/user/customer-flight-booking",
    userCarBooking: "/user/customer-car-booking",
    userCruiseBooking: "/user/customer-cruise-booking",
    userHotlesBooking: "/user/customer-hotel-booking",
    userTourBooking: "/user/customer-tour-booking",
    userBusBooking: "/user/customer-bus-booking",
    userTourGuideBooking: "/user/customer-tour-guides-booking",
    userVisaBooking: "/user/customer-visa-booking",
    userActivitiesBooking: "/user/customer-activities-booking",
    userReviews: "/user/review",
    userChat: "/user/chat",
    userWishlist: "/user/wishlist",
    userCoupons: "/user/customer-coupons",
    userLoyaltyPoints: "/user/customer-loyalty-points",
    userRewardHistory: "/user/customer-reward-history",
    userReferralProgram: "/user/customer-referral-program",
    userGiftCards: "/user/customer-gift-cards",
    userWallet: "/user/wallet",
    myProfile: "/user/my-profile",
    profileSettings: "/user/profile-settings",
    notification: "/user/notifications",
    securitySettings: "/user/security-settings",
    notificationSettings: "/user/notification-settings",
    integrationSettings: "/user/integration-settings",
    preferencesSettings: "/user/preferences-settings",


    //Pages

    wishlist: "/user/wishlist",
    becomeAnExpert: "/become-an-expert",
    privacyPolicy: "/pages/privacy-policy",
    termsConditions: "/pages/terms-conditions",
    contactUs: "/pages/contact-us",
    blogList: "/blog/blog-list",
    blogGrid: "/blog",
    blogDetails: "/blog/blog-details",
    destination: "/pages/destination",
    about_us: "/pages/aboutus",
    teams: "/pages/team",
    invoices: "/pages/invoices",
    Gallery: "/pages/gallery",
    Testimonials: "/pages/testimonials",
    FAQ: "/pages/faq",
    pricingPlan: "/pages/pricing-plan",
    pricingPlantwo: "/pages/pricing-plan-two",
    recentlyViewed: "/pages/recently-viewed",
    destrinationDetails: "/pages/destination-details",
    Error404: "/error-404",
    Error500: "/error-500",
    underMaintenance: "/pages/under-maintenance",
    homeOneRtl: "/pages/rtl",
    comingSoon: "/coming-soon",
    compare: "/pages/compare",
    styleGuide: "/pages/style-guide",



};
