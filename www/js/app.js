// Ionic Starter App

angular.module('starter', ['ionic', 'starter.controllers','checklogin','checksignUp', 'lifestory', 'profilecontroller','storycontroller','howaboutUs','aboutUscontroller','addNodeController','checkforgetPassword','app.factories.localstorage','ion-datetime-picker', 'editTreecontroller','editTreeFactory','ngCordova','addNodeController','familyTreecontroller','nodes','eventcontroller','galleryController','galleryFactory','addEvent','ion-floating-menu','nodecontroller','deleteTreeFactory','galleryController','galleryFactory','ngCordovaOauth','searchScreenFactory','searchScreencontroller','notificationFactory','notificationController','inAppController','treeInvitecontroller','treeInviteFactory','getInvitecontroller','getInviteFactory','pascalprecht.translate','languagecontroller','languageFactory','ionic.cloud','becomeAdminController','becomeAdminFactory','payScreencontroller','getContactFactory','payPalFactory','generationController','CommonDirectives','verticalTreeController','verticalTreeFactory','paymentFactory','clan.directive','commonFactory','inAppPurchaseFactory','contactController','changeCoverController','changeCoverFactory','unlockNodeController','ancestryController','launchcontroller','launchArabiccontroller','ngCordovaOauth'])

    .run(function($ionicPlatform,$localstorage,$translate,$rootScope,$state,$login,$rootScope,$cordovaLocalNotification,$window,$cordovaPush,$ionicPopup,$ionicHistory,$commonFactory) {

        $ionicPlatform.ready(function() {

            var webserviceURL = 'http://qabilati.com/ws.php';
            $localstorage.set("webserviceURL",webserviceURL);

            //var webserviceTreeURL = 'http://qabilati.wiseprm.com/tree.php';
            var webserviceTreeURL = 'http://qabilati.com/tree.php';
            $localstorage.set("webserviceTreeURL",webserviceTreeURL);

            //var siteroot = 'http://qabilati.wiseprm.com/';
            var siteroot = 'http://qabilati.com/';
            $localstorage.set("siteroot",siteroot);

            //var profileImgURL = 'http://qabilati.wiseprm.com/uploads/profileimage/';
            var profileImgURL = 'http://qabilati.com/uploads/profileimage/';
            $localstorage.set("profileImgURL",profileImgURL);

            $localstorage.set("Tree_ClickID","0");


            /*var webserviceURL = 'http://localhost/projects/qabilatiweb.svn/services.php';
            $localstorage.set("webserviceURL",webserviceURL);

            var webserviceTreeURL = 'http://localhost/projects/qabilatiweb.svn/tree.php';
            $localstorage.set("webserviceTreeURL",webserviceTreeURL);

            var siteroot = 'http://localhost/projects/qabilatiweb.svn/';
            $localstorage.set("siteroot",siteroot);
            
            var profileImgURL = 'http://localhost/projects/qabilatiweb.svn/uploads/profileimage/';
            $localstorage.set("profileImgURL",profileImgURL);*/

          $commonFactory.getClans().then(function(data){
                var result = data; 
                if(result.status == 1){
                    $localstorage.set("Clans",JSON.stringify(result.data));
                }else{
                  $localstorage.set("Clans","");
                }
            })

            $commonFactory.getFamily().then(function(data){
                var result = data; 
                if(result.status == 1){
                    $localstorage.set("Family",JSON.stringify(result.data));
                }else{
                  $localstorage.set("Family","");
                }
            })
			
			$ionicPlatform.registerBackButtonAction(function() {
        		if ($state.current.name == "app.FamilyMemberLifeStory" || $state.current.name == "login" || $state.current.name=="language") {
            	 	navigator.app.exitApp();
        		} else {
    				navigator.app.backHistory();
					$ionicHistory.goBack();
  				}
    		}, 100);

            if (window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }
       });
	   
	  /* document.addEventListener("backbutton", onBackKeyDown, false);
		function onBackKeyDown(){
			if ($state.current.name == "login") {
 			 alert("Back key is pressed");
  			// write your logics here;
			}
		}*/
    })

    /*.constant('shopSettings',{

    payPalSandboxId:'AYog9hUAaTaBGYGlNIhHLyFoP_HHbaxmR3nl9LTPpCvOHotz_8lN8SNv_Uuh9DS2tOZaxPzBIEm3aGz9',

    payPalProductionId: 'AfeeFxxVXPp-MDSOj6uoUs0bzevSzeze1gce_DonIyFgxm3EZZAgeRE-vZtp17_BNiuNU8tA8fsnVzsN',

    payPalEnv: 'PayPalEnvironmentProduction', // PayPalEnvironmentProduction, PayPalEnvironmentSandbox

    payPalShopName : 'tree',

        payPalMerchantPrivacyPolicyURL : 'http://qabilati.com/services.php',

        payPalMerchantUserAgreementURL : 'http://qabilati.com/services.php'
    })*/

    .constant('shopSettings',{

    payPalSandboxId:'Aa3vhTCQkbHRSvR7phcVx08JxD79-K9bVVikcaWIEAgRtj9Uad32OqUiD5j9DbRL4AkDrTFuu9h9vA1K',

    payPalProductionId: 'AVOqtCe1N5wouQ80n870lNRk5hjwb4WcDOgk3BvV_wq8Rup3dgboV4SizQh85n46j2YUSYyOwqNZk43e',

    payPalEnv: 'PayPalEnvironmentProduction', // for testing production for production

    payPalShopName : 'Qabilati',

        payPalMerchantPrivacyPolicyURL : 'http://qabilati.com/services.php',

        payPalMerchantUserAgreementURL : 'http://qabilati.com/services.php'
    })

.config(function($stateProvider, $urlRouterProvider,$translateProvider,$ionicCloudProvider) {
  
    $ionicCloudProvider.init({
        "core": {
          "app_id": "26785339"
        },
        "push": {
              "sender_id": "837401437916",
                "pluginConfig": {
                "ios": {
                  "badge": true,
                  "sound": true,
                  "forceShow": true
                },
                "android": {
                  "iconColor": "#343434",
                  "badge": true,
                  "sound": true,
                  "forceShow": true
                }
            }
        }
    });

       
    lanArr = Array();
    lanArr = ["en","ar"];
    var deviceLanguage = navigator.language; 
    var langCode = (navigator.language).split("-")[0];
    var chkAvailLanguage = lanArr.indexOf(langCode);
    $translateProvider.fallbackLanguage(['en', 'ar']);
	$translateProvider.preferredLanguage(langCode);
  	if(chkAvailLanguage < 0){
      $translateProvider.preferredLanguage("en");
  	}
  //console.log("Device laguage in c:"+deviceLanguage+" and code is=>"+langCode);
  	for(lang in translations){
    	$translateProvider.translations(lang, translations[lang]);
  	} 

    /*document.addEventListener('deviceready', function () {
        cordova.plugins.notification.badge.set(10);
    }, false);*/

    

    $translateProvider.translations('en',{
        "USERNAME" : "Username",
        "PASSWORD" : "Password",
        "LOGIN_HEADER" : "LOGIN",
        "LOGIN" : "Login",
        "EMAIL_REQUIRED" : "Email required",
        "PASSWORD_REQUIRED":"Password required",
        "FORGET_PASSWORD" : "Forgot Password",
        "NOT_A_REGISTERED_USER" : "Don't have an account? Sign up today!",
        "SIGN_UP" : "SignUp",
        "YOU_CAN_ALSO_LOGIN_WITH" : "You can also login with",
        "SIGN_UP_TO_QABILATI" : "SIGN UP TO QABILATI",
        "SIGN_UP_FORM" : "Sign Up",
        "FIRST_NAME" : "First Name",
        "FIRST_NAME_REQUIRED" : "First Name required",
        "LAST_NAME" : "Last Name",
        "LAST_NAME_REQUIRED" : "Last Name required",
        "CLAN" : "Clan",
        "CLAN_REQUIRED" : "Clan required",
        "EMAIL" : "Email",
        "ENTER_CORRECT_EMAIL" : "Enter correct Email",
        "MIN_CHAR_REQUIRED_PASSWORD" : "Min 6 Character required",
        "MAX_CHAR_REQUIRED_PASSWORD" : "Max 15 Character required",
        "BIRTH_DATE" : "Birth Date",
        "BIRTH_DATE_REQUIRED" : "Birth Date required",
        "CITY_NAME" : "City Name",
        "CITY_NAME_REQUIRED" : "City Name required",
        "PLACE_OF_BIRTH" : "Place of Birth",
        "PLACE_OF_BIRTH_REQUIRED" : "Place of Birth required",
        "PLACE_OF_RESIDENCE" : "Place of Residence",
        "PLACE_OF_RESIDENCE_REQUIRED" : "Place of Residence required",
        "FATHER_NAME" : "Father Name",
        "FATHER_NAME_REQUIRED" : "Father Name required",
        "MOTHER_NAME" : "Mother Name",
        "MOTHER_NAME_REQUIRED" : "Mother Name required",
        "SPOUSE_NAME" : "Spouse Name",
        "SPOUSE_NAME_REQUIRED" : "Spouse Name required",
        "PHONE_NUMBER" : "Phone Number",
        "PHONE_NUMBER_REQUIRED" : "Phone Number required",
        "PHONE_NUMBER_LENGTH" : "10 digits required",
        "PHONE_INVALID" : "invalid Phone Number",
        "ADDRESS" : "Address",
        "ADDRESS_REQUIRED" : "Address required",
        "GENDER" : "Gender",
        "MALE" : "Male",
        "FEMALE" : "Female",
        "ADD_IMAGE" : "Add Image",
        "PROFILE_PIC_REQUIRED" : "Profile Photo required",
        "EDIT_TREE" : "Edit Profile",
        "DELETE_TREE" : "Remove",
        "LIFE_STORY" : "Life Story",
        "NO_LIFE_STORY_FOUND" : "No Life Story Found",
        "FAMILY" : "Family",
        "NO_FAMILY_FOUND" : "No Family Members Found",
        "GALLERY" : "Gallery",
        "NO_GALLERY_FOUND" : "No Photo Found",
        "EVENTS" : "Events",
        "NO_EVENTS_FOUND" : "No Event Found",
        "INVITE_PEOPLE" : "Invite People",
        "ADD_STORY" : "Add story",
        "ADD_MEMBER" : "Add Member",
        "ADD_PHOTO" : "Add Photo",
        "ADD_EVENT" : "Add Event",
        "EVENT_TITLE" : "Event Title",
        "EVENT_TITLE_REQUIRED" : "Event Title required",
        "EVENT_DESCRIPTION" : "Event Description",
        "EVENT_DESCRIPTION_REQUIRED" : "Event Description required",
        "EVENT_LOCATION" : "Event Location",
        "EVENT_LOCATION_REQUIRED" : "Event Location required",
        "EVENT_DATE" : "Event Date",
        "EVENT_DATE_REQUIRED" : "Event Date required",
        "TITLE" : "Title",
        "TITLE_REQUIRED" : "Title required",
        "DATE" : "Date",
        "DATE_REQUIRED" : "Date required",
        "LOCATION" : "Location",
        "LOCATION_REQUIRED" : "Location required",
        "DESCRIPTION" : "Description",
        "DESCRIPTION_REQUIRED" : "Description required",
        "SAVE_BTN" :"SAVE",
        "SELECT_RELATION" :"Select Relation",
        "PARENTS" : "Parents",
        "SPOUSE" : "Spouse",
        "SIBLING" : "Sibling",
        "CHILD" : "Child",
        "SPOUSE_MAIDEN_NAME" : "Spouse Maiden Name",
        "SPOUSE_MAIDEN_NAME_REQUIRED" : "Spouse Maiden Name required",
        "THIS_PERSON_IS_LIVING" : "is Living",
        "YES_CONSTANT" : "Yes",
        "NO_CONSTANT" :"No",
        "DATE_OF_PASSING_AWAY" : "Date of Passing Away",
        "DATE_OF_PASSING_AWAY_REQUIRED" : "Date of Passing Away required",
        "STORY_TITLE" : "Story Title",
        "STORY_TITLE_REQUIRED" : "Story Title required",
        "STORY_DESCRIPTION" : "Story Description",
        "STORY_DESCRIPTION_REQUIRED" : "Story Description required",
        "STORY_LOCATION" : "Story Location",
        "STORY_LOCATION_REQUIRED" : "Story Location required",
        "STORY_DATE" : "Story Date",
        "STORY_DATE_REQUIRED" : "Story Date required",
        "FAMILY_ADMIN" : "FAMILY ADMIN",
        "FAMILY_BECOME_ADMIN" : "BECOME ADMIN OF YOUR FAMILY",
        "FAMILY_TREE_ADMIN" : "Your family Tree Admin is",
        "FAMILY_BECOME_ADMIN_INFO" : "is your current admin who had paid",
        "FAMILY_BECOME_ADMIN_INFO2" : "to become admin. Pay more, and become admin of your family.",
        "CHARGES_PAID_BY_FAMILY_ADMIN" : "Charges paid by family admin",
        "PASSWORD_RESET_LINK" : "Shall we send a link to reset your password to ",
        "SEND_EMAIL" : "SEND EMAIL",
        "NAME" : "Name",
        "HOME" : "Home",
        "TREE" : "Tree",
        "ABOUT_US" : "About Us",
        "HOW_TO_USE" : "How to Use",
        "FAMILY_ADMIN_SMALL" : "Family Admin",
        "PAYMENT" : "PAYMENT",
        "BECOME_ADMIN" : "Become an Admin",
        "SEARCH_PERSON" : "Search Person",
        "NOTIFICATION_LIST" : "Notifications",
        "LOGOUT" : "Logout",
        "PAY_TO_ADD_FAMILY_TREE_OF_GENERATION" : "PAY TO ADD FAMILY TREE OF 4+ GENERATION",
        "CREATE_NODE_TREE_PAY" : "To create 4+ nodes of your family tree pay",
        "PAYMENT_INFO" : "Payment Information",
        "CREDIT_CARD_NUMBER" : "Credit Card Number",
        "PAYMENT_INFO_REQUIRED" : "Payment Information required",
        "SECURITY_CODE" : "Security Code",
        "WHAT_IS_THIS" : "What is This?",
        "SECURITY_CODE_REQUIRED" : "Security Code required",
        "EXPIRATION_DATE" : "Expiration Date",
        "EXPIRATION_DATE_REQUIRED" : "Expiration Date required",
        "TERMS_AND_CONDITIONS" : "I have read and agree to the Terms and Conditions",
        "PAY_BTN" : "Purchase",
        "EDIT_FAMILY_TREE_NODE" : "EDIT FAMILY TREE NODE",
        "OK_CONSTANT" : "OK",
        "ERROR_CONSTANT" : "ERROR",
        "EMPTY_CONSTANT" : "Please enter all required fields",
        "SUCCESS_CONTANT" : "SUCCESS",
        "FORGET_PASSWORD_ALERT_EMAIL" : "Please enter email",
        "EMAIL_SENT_SUCCESSFULLY" : "Email Send Successfully",
        "CONFIRM_LOGOUT" : "CONFIRM LOGOUT",
        "CONFIRM_LOGOUT_MESSAGE" : "Are you sure you want to log out?",
        "CANCEL_CONSTANT" : "CANCEL",
        "CONFIRM_DELETE" : "CONFIRM DELETE",
        "CONFIRM_DELETE_MESSAGE" : "Are you sure you want to delete node?",
        "Node_deleted_succesfully" : "Node deleted succesfully",
        "ERROR" : "ERROR",
        "No_Notification_avilable" : "No Record Avilable",
        "Fetch_Data_successfully" : "Fetch Data Successfully",
        "No_Family" : "No Family",
        "Profile_updated_succesfully" : "Profile Updated Succesfully",
        "Event_successfully_Added" : "Event Added Successfully",
        "Problem_in_Stody_Add" : "Problem in Adding Story",
        "Event_Fetch_Successfully" : "Event Fetch Successfully",
        "No_Events" : "No Events",
        "Email_ID_does_not_exist_in_Qabilati" : "Email ID does not exist in Qabilati",
        "Email_sent_successfully" : "Email Sent Successfully",
        "problem_in_email_sending" : "Problem in Sending Email",
        "Record_inserted_successfully" : "Photo Added Successfully",
        "Gallery_Fetch_successfully" : "Gallery Fetch successfully",
        "No_recod_found" : "No record found",
        "languages_list" : "Language Fetch Successfully",
        "Story_fetch_Successfully" : "Story Added Successfully",
        "Please_Add_Your_Life_Story" : "Please Add Your Life Story",
        "LOGIN_SUCCESS" : "Login Successfully",
        "Your_email_ID_is_not_verified_Please_verify_your_email_address" : "Your Email ID is not verified Please verify your email address",
        "Your_are_not_active" : "You are not active",
        "Your_are_inactive_by_admin" : "You are inactive by admin",
        "INVALID_EMAIL_AND_PASSWORD" : "Invalid Email and Password",
        "Please_enter_valid_email_and_password" : "Please enter valid email and password",
        "Node_already_exist" : "Node already exist",
        "Need_To_Pay_For_Adding_New_Node" : "Need To Pay For Adding New Node",
        "Node_Added_Successfully" : "Node Added Successfully",
        "Problem_in_Adding_Node" : "Problem in Adding Node",
        "Family_Fetch_Successfully" : "Family Fetch Successfully",
        "Something_went_wrong" : "Something went wrong",
        "Email_ID_already_exist" : "Email ID already exist",
        "Registered_successfully_Please_verify_your_email_address" : "Registered Successfully Please verify your email address",
        "Problem_in_registration" : "Problem in Registration",
        "Record_already_exist" : "Record already exist",
        "new_user" : "New User",
        "Registered_successfully" : "Registered Successfully",
        "User_Already_exist" : "User Already Exist",
        "Mail_Sent_Successfully" : "Mail Sent Successfully",
        "SUCCESS" : "SUCCESS",
        "SELECT_IMAGE_SOURCE" : "SELECT IMAGE SOURCE",
        "LOAD_FROM_LIBRARY" : "LOAD FROM LIBRARY",
        "USE_CAMERA" : "USE CAMERA",
        "SEARCH" : "Search",
        "Already_Invited_By_User": "Already Invited",
        "CONTACTS" : "Contacts",
        "GET_CONTACT_DETAILS" : "Get contact details",
        "Story_Updated_succesfully" : "Story Updated Succesfully",
        "Event_Updated_succesfully" : "Event Updated Succesfully",
        "GET_CONTACT_DETAILS_INFO" : "To get contact details pay",
        "INVITED_PEOPLE_LIST" : "Invited People List",
        "Only_4_Spouse" : "You Can add Only 4 Spouse",
        "MERGE_TREE" : "Merge Tree",
        "VIEW_TREE" : "View Tree",
        "MERGE_TREE_PAYMENT" : "Merge Tree Payment",
        "TO_MERGE_TREE_PAY" : "To Merge Tree You Need to Pay",
        "LANGUAGE" : "language",
        "Problem_in_Adding_Event" : "Problem in Adding Event",
        "No_Admin" : "No Admin",
        "No_Admin_yet_Pay_$5_to_become_Admin" : "No Admin yet Pay $5 to become Admin",
        "Now_you_are_Admin" : "Now you are Admin",
        "Tree_Merged_succesfully" : "Tree Merged Succesfully",
        "No_Tokens_Found" : "No Tokens Found",
        "Story_successfully_Added" : "Story Added successfully",
        "CONTACT_DETAILS" : "Contact Details",
        "SELECT_COUNTRY" : "Select Country",
        "SELECT_STATE" : "Select State",
        "SELECT_CITY" : "Select City",
        "ADD_SELECT_CITY" : "Add Your City",
        "REQUIRED" : "Required",
        "CANCEL" : "Cancel",
        "CONTACT_US" : "Contact US",
        "Message_text" : "Message",
        "Message_REQUIRED" : "Please Enter Your Message",
        "Thanks_For_Contacting" : "Thank you for contacting us, Our team will soon get in touch with you.",
        "Something_Went_Wrong" : "Something Went Wrong",
        "Restricted_Families" : "This Families and Clans Restricted in app. Please click On OK for contacting Admin",
        "Ancestry_AND_Genealogy" : "Ancestry & Genealogy",
        "SELECT_PAYPAL" : "Using Paypal",
        "SELECT_InApp" : "Using InAppPurchase",
        "SELECT_PAYMENT_METHOD" : "Select Payment Methods",
        "Ancestry_AND_Genealogy_msg" : "You will soon be able to track your ancestors path in this feature . If you are interested please press OK",
        "Tribe_Bundle" : "Tribe Bundle",
        "Clan_Bundle" : "Clan Bundle", 
        "Folk_Bundle" : "Folk Bundle",
        "Qabilati_Bundle" : "Qabilati Bundle",
        "Remaining_view_msg" : "If you want to view details of this user then, you need to loose your 1 view.",
        "WANT_MERGE" : "has its own tree. Do you wants to merge his tree in your tree?",
        "BECOME_ADMIN_INFO" : "No Admin Yet Pay more than $4 to become Admin",
        "PAYMENT_MSG" : "If you Know this Person & you want to see contact details, then you need to pay one doller.",
        "MERGE_TREE_PAYMENT_MSG" : "You are part of a tree and in order to connect to the tree you need to pay the one dollar",
        "APP_NAME" : "Qabilati",
        "SHARING_INFO" : "Sharing Relation through Qabilati",
        "SIGN_UP_TEXT" : "SIGN UP",
        "APP_TAGLINE" : "Connecting through Bloodline",
        "LANGUAGE_SELECTION" : "Choose Your Preferred Language",
        "No_Notification" : "No Notification Found",
        "Search_Result" : "Search Results",
        "Already_Account" : "Already have an account?",
        "Your" : "Your",
        "story" : "story",
        "family" : "family",
        "ancestry" : "ancestry",
        "Change_Cover_Image" : "Change Cover Image",
        "GET_BUNDLE_INFO" : "To be able to view the contact details of any of your relatives or friends you will have to purchase one of our standard bundles.",
        "Exit_Msg_Title" : "Exit Qabilati?",
        "Exit_Msg" : "Are you sure you want to exit Qabilati?",
        "Unlock_Member_MSG" : "This member is come from tree merge. If you wants to view,edit or change cover Image of this member then you need pay.",
        "Unlock_Member" : "Unlock Member",
        "Invitation_Send_Successfully" : "Invitation Send Successfully",
        "SEND_BTN" : "Send",
        "selt_invites" : "Self invitation cannot be send",
        "Track_Your_Ancestors_Path" : "Track Your Ancestors Path",
        "Products" : "Products",
        "Load_Products" : "Load Products",
        "Using_Apple_Pay" : "Using Apple Pay",
        "Cover_Change_succesfully" : "Cover Image Updated Successfully",
        "TERMS_Required" : "Please accept terms and conditions",
	   "ARE_YOU_INTERESTED" : "If you are interested then press ok",
       "View_Tutorial" : "View Tutorial"
    });
    $translateProvider.translations('ar',{
         "USERNAME" : "اسم المستخدم",
        "PASSWORD" : "كلمة السر",
        "LOGIN_HEADER" : "تسجيل الدخول",
        "LOGIN" : "تسجيل الدخول",
        "EMAIL_REQUIRED" : "البريد الاكتروني مطلوب",
        "PASSWORD_REQUIRED":"مطلوب كلمة السر",
        "FORGET_PASSWORD" : "هل نسيت كلمة السر",
        "NOT_A_REGISTERED_USER" : "ليس لديك حساب؟ سجل اليوم!",
        "SIGN_UP" : "تسجيل",
        "YOU_CAN_ALSO_LOGIN_WITH" : "يمكنك أيضا تسجيل الدخول مع",
        "SIGN_UP_TO_QABILATI" : "تسجيل مع تطبيق قبيلتي",
        "SIGN_UP_FORM" : "استمارة التسجيل",
        "FIRST_NAME" : "الاسم",
        "FIRST_NAME_REQUIRED" : "مطلوب الاسم",
        "LAST_NAME" : "اسم العائلة",
        "LAST_NAME_REQUIRED" : "مطلوب اسم العائلة",
        "CLAN" : "اسم القبيلة",
        "CLAN_REQUIRED" : "مطلوب اسم القبيلة",
        "EMAIL" : "البريد الالكتروني",
        "ENTER_CORRECT_EMAIL" : "يجب ادخال البريد الالكتروني الصحيح",
        "MIN_CHAR_REQUIRED_PASSWORD" : "مطلوب على الأقل٦ احرف/ارقام",
        "MAX_CHAR_REQUIRED_PASSWORD" : "مطلوب على الأقل ١٥ حرف/رقام",
        "BIRTH_DATE" : "تاريخ الميلاد",
        "BIRTH_DATE_REQUIRED" : "مطلوب بيانات تاريخ الميلاد",
        "CITY_NAME" : "اسم المدينة",
        "CITY_NAME_REQUIRED" : " مطلوب اسم المدينة",
        "PLACE_OF_BIRTH" : "مكان الميلاد",
        "PLACE_OF_BIRTH_REQUIRED" : "مطلوب بيانات  مكان الميلاد",
        "PLACE_OF_RESIDENCE" : "مكان الإقامة",
        "PLACE_OF_RESIDENCE_REQUIRED" : "مطلوب بياتات مكان الإقامة",
        "FATHER_NAME" : "اسم الاب",
        "FATHER_NAME_REQUIRED" : "مطلوب اسم الاب",
        "MOTHER_NAME" : "اسم الام",
        "MOTHER_NAME_REQUIRED" : "مطلوب اسم الام",
        "SPOUSE_NAME" : "اسم الزوج/الزوجة",
        "SPOUSE_NAME_REQUIRED" : "مطلوب اسم الزوج/الزوجة",
        "PHONE_NUMBER" : "رقم الهاتف",
        "PHONE_NUMBER_REQUIRED" : "مطلوب رقم الهاتف",
        "PHONE_NUMBER_LENGTH" : "مطلوب رقم هاتف مؤلف من عشر ارقام",
        "PHONE_INVALID" : "رقم الهاتف غير صحيح",
        "ADDRESS" : "العنوان",
        "ADDRESS_REQUIRED" : "مطلوب العنوان",
        "GENDER" : "الجنس",
        "MALE" : " ذكر",
        "FEMALE" : "انثى",
        "ADD_IMAGE" : "اضف الصورة",
        "PROFILE_PIC_REQUIRED" : "مطلوب الصورة الشخصية",
        "EDIT_TREE" : "تعديل",
        "DELETE_TREE" : "حذف",
        "LIFE_STORY" : "قصة الحياة",
        "NO_LIFE_STORY_FOUND" : "لم يوجد قصة حياة",
        "FAMILY" : "عائلة",
        "NO_FAMILY_FOUND" : "لم يوجد عضو في العاألة",
        "GALLERY" : "عرض الصور",
        "NO_GALLERY_FOUND" : "لم يوجد صورة",
        "EVENTS" : "الفعاليات",
        "NO_EVENTS_FOUND" : "لم يوجد فعاليات",
        "INVITE_PEOPLE" : "دعوة الأشخاص",
        "ADD_STORY" : "إضافة قصة",
        "ADD_MEMBER" : "إضافة عضو",
        "ADD_PHOTO" : "إضافة صورة",
        "ADD_EVENT" : "إضافة فعالية",
        "EVENT_TITLE" : "اسم الفعالية",
        "EVENT_TITLE_REQUIRED" : "مطلوب اسم الفعالية",
        "EVENT_DESCRIPTION" : "وصف الفعالية",
        "EVENT_DESCRIPTION_REQUIRED" : "مطلوب وصف الفعالية",
        "EVENT_LOCATION" : "مكان الفعالية",
        "EVENT_LOCATION_REQUIRED" : "مطلوب مكان الفعالية",
        "EVENT_DATE" : "تاريخ الفعالية",
        "EVENT_DATE_REQUIRED" : "مطلوب تاريخ الفعالية",
        "TITLE" : "الاسم التعريفي",
        "TITLE_REQUIRED" : "مطلوب الاسم التعريفي",
        "DATE" : "التاريخ",
        "DATE_REQUIRED" : "مطلوب التاريخ",
        "LOCATION" : "المكان",
        "LOCATION_REQUIRED" : "مطلوب المكان",
        "DESCRIPTION" : "الوصف",
        "DESCRIPTION_REQUIRED" : "مطلوب الوصف",
        "SAVE_BTN" :"حفظ",
        "SELECT_RELATION" :"تحديد العلاقة",
        "PARENTS" : "اب/ام",
        "SPOUSE" : "زوج/زوجة",
        "SIBLING" : "اخ/اخت",
        "CHILD" : "ابن / ابنة",
        "SPOUSE_MAIDEN_NAME" : "علذلة الزوجة",
        "SPOUSE_MAIDEN_NAME_REQUIRED" : "مطلوب عاذلة الزوجة",
        "THIS_PERSON_IS_LIVING" : "هو حي",
        "YES_CONSTANT" : "نعم",
        "NO_CONSTANT" :"لا",
        "DATE_OF_PASSING_AWAY" : "تاريخ الوفاة",
        "DATE_OF_PASSING_AWAY_REQUIRED" : "مطلوب تاريخ الوفاة",
        "STORY_TITLE" : "الاسم التعريفي للقصة",
        "STORY_TITLE_REQUIRED" : "مطلوب اسم تعريفي للقصة",
        "STORY_DESCRIPTION" : "وصف القصة",
        "STORY_DESCRIPTION_REQUIRED" : "مطلوب وصف للقصة",
        "STORY_LOCATION" : "مكان القصة",
        "STORY_LOCATION_REQUIRED" : "مطلوب مكان القصة",
        "STORY_DATE" : "تاريخ القصة",
        "STORY_DATE_REQUIRED" : "مطلوب تاريخ القصة",
        "FAMILY_ADMIN" : "معرف القبيلة",
        "FAMILY_BECOME_ADMIN" : "اصبح معرف لقبيلتك",
        "FAMILY_TREE_ADMIN" : "معرف قبيلتك هو",
        "FAMILY_BECOME_ADMIN_INFO" : "هل معرف قبيلتك الحالي هو من دفع",
        "FAMILY_BECOME_ADMIN_INFO2" : "لتصبح معرف القبيلة ، يجب ان تدفع اكثر ،وتصبح معرف القبيلة",
        "CHARGES_PAID_BY_FAMILY_ADMIN" : "المبلغ المدفوع من معرف القبيلة الحالي",
        "PASSWORD_RESET_LINK" : "سوف نقوم بارسال رابط لاعادة تعيين كلمة السر الا ",
        "SEND_EMAIL" : "ارسال البريد",
        "NAME" : "الاسم",
        "HOME" : "الصفحة الرئيسية",
        "TREE" : "شجرة العائلة",
        "ABOUT_US" : "ملخص عن التبيق",
        "HOW_TO_USE" : "كيفية استعمال التطبيق",
        "FAMILY_ADMIN_SMALL" : "معرف القبيلة",
        "PAYMENT" : "الدفع",
        "BECOME_ADMIN" : "اصبح معرف القبيلة",
        "SEARCH_PERSON" : "بحث عن الشخص",
        "NOTIFICATION_LIST" : "إخطارات",
        "LOGOUT" : "تسجيل الخروج",
        "PAY_TO_ADD_FAMILY_TREE_OF_GENERATION" : "ادفع لتحصل عل شجرة العاذلة لاكثر من اربع أجيال",
        "CREATE_NODE_TREE_PAY" : "لتحصل عل شجرة العاذلة لاكثر من اربع أجيال يرجى الدفع",
        "PAYMENT_INFO" : "معلومات الدفع",
        "CREDIT_CARD_NUMBER" : "معلومات بطاقة الاتمان البنكي",
        "PAYMENT_INFO_REQUIRED" : "مطلوب معلومات الدفع",
        "SECURITY_CODE" : "رمز السري  لبطاقة الاتمان البنكي",
        "WHAT_IS_THIS" : "ما هذا?",
        "SECURITY_CODE_REQUIRED" : "مطلوبرمز السري  لبطاقة الاتمان البنكي",
        "EXPIRATION_DATE" : "تاريخ انتهاء بطاقة الاتمان البنكي",
        "EXPIRATION_DATE_REQUIRED" : "مطلوب تاريخ انتهاء بطاقة الاتمان البنكي",
        "TERMS_AND_CONDITIONS" : "لقد قرأت  الاحكام والشروط وموافق عليها",
        "PAY_BTN" : "شراء",
        "EDIT_FAMILY_TREE_NODE" : "تعديل شجرة العائلة",
        "OK_CONSTANT" : "موافق",
        "ERROR_CONSTANT" : "خطأ",
        "EMPTY_CONSTANT" : "يرجو ادخال جميع البيانات المطلوبة",
        "SUCCESS_CONTANT" : "تمت بنجاح",
        "FORGET_PASSWORD_ALERT_EMAIL" : "يرجى ادخال البريد الالكروني",
        "EMAIL_SENT_SUCCESSFULLY" : "لقد تم بنجاح ارسال البريد الالكتروني",
        "CONFIRM_LOGOUT" : "تأكيد تسجيل الخروج",
        "CONFIRM_LOGOUT_MESSAGE" : "هل انت متأكد من تسجيل الخروج ؟",
        "CANCEL_CONSTANT" : "الغاء العملية",
        "CONFIRM_DELETE" : "تأكيد الحذف",
        "CONFIRM_DELETE_MESSAGE" : "هل انت متاكد من حذف عضو العائلة ؟",
        "Node_deleted_succesfully" : "لقد تم حذف عضو العائلة بنجاح",
        "ERROR" : "خطأ",
        "Fetch_Data_successfully" : "لقد تم احضار البياتات بنجاح",
        "No_Family" : "لا يوجد عائلة",
        "Profile_updated_succesfully" : "لقد تم تحديث البيانات الشخصية بنجاح",
        "Event_successfully_Added" : "لقد تم إضافة الفعالية بنجاح",
        "Problem_in_Stody_Add" : "يوجد خلل في إضافة القصة",
        "Event_Fetch_Successfully" : "لقد تم احظار الفعالية بنجاح",
        "No_Events" : "لا يوجد فعاليات",
        "Email_ID_does_not_exist_in_Qabilati" : "هذا البريد الالكتروني غير مستخدم في تطبيق قبيلتي",
        "Email_sent_successfully" : "لقد تم ارسال البريد الالكتروني بنجاح",
        "problem_in_email_sending" : "يوجد خلل في ارسال البريد الالكتروني",
        "Record_inserted_successfully" : "تمت إضافة الصورة بنجاح",
        "Gallery_Fetch_successfully" : "لقد تم احضار الصور الى المعرض بنجاح",
        "No_recod_found" : "لن نجد أي بياتات مسجلة لدينا",
        "languages_list" : "لقد تم احضار اللغة بنجاح",
        "Story_fetch_Successfully" : "لقد تم إضافة القصة بنجاح",
        "Please_Add_Your_Life_Story" : "يرجى إضافة قصة حياتك",
        "LOGIN_SUCCESS" : "لقد تم تسجيل الدخول بنجاح",
        "Your_email_ID_is_not_verified_Please_verify_your_email_address" : "بريدك الالكتروني غير موثق ، يرجى توثيق البريد الالكتروني",
        "Your_are_not_active" : "انت غير ناشط في التطبيق",
        "Your_are_inactive_by_admin" : "لقد تم توقيف تفعيلك من قبل معرف القبيلة",
        "INVALID_EMAIL_AND_PASSWORD" : "البريد الالكتروني وكلمة السر غير صحيحين",
        "Please_enter_valid_email_and_password" : "يرجى ادخال بريد الكتروني وكلمة السر الصحيحين",
        "Node_already_exist" : "عضو العائلة موجود من قبل",
        "Need_To_Pay_For_Adding_New_Node" : "يرجى الدفع لاضافة عضو عائلة جديد",
        "Node_Added_Successfully" : "لقد تم إضافة عضو العائلة بنجاح",
        "Problem_in_Adding_Node" : "يوجد مشكلة في إضافة عضو العائلة",
        "Family_Fetch_Successfully" : "يوجد مشكلة في إضافة عضو العائلة",
        "Something_went_wrong" : "يوجد خلل فني",
        "Email_ID_already_exist" : "البريد الالكتروني مستخدم من قبل",
        "Registered_successfully_Please_verify_your_email_address" : "لقد تم تسجيل البياتات بنجاح يرجى توثيق بريدك الالكتروني",
        "Problem_in_registration" : "يوجد خلل فني في تسجيل البيانات",
        "Record_already_exist" : "البيانات مسجلة لدينا من قبل",
        "new_user" : "مستخدم جديد",
        "Registered_successfully" : "لقد تم التسجيل بنجاح",
        "User_Already_exist" : "المستخدم موجود من قبل",
        "Mail_Sent_Successfully" : "لقد تم ارسال البريد الالكتروني بنجاح",
        "SUCCESS" : "نجاح",
        "SELECT_IMAGE_SOURCE" : "يرجى تحديد مصدر الصورة",
        "LOAD_FROM_LIBRARY" : "تحميل الصورة من ملف الصور",
        "USE_CAMERA" : "استخدم الكامير",
        "SEARCH" : "بحث",
        "Already_Invited_By_User": " لقد تم ارسال الدعوة من قبل",
        "CONTACTS" : " قا ئمة الالمستخدمين المسجلة",
        "GET_CONTACT_DETAILS" : "احضار بياتات المستخدم المسجلة",
        "Story_Updated_succesfully" : "لقد تم تحديث القصة بنجاح",
        "Event_Updated_succesfully" : "لقد تم تحديث الفعالية بنجاح",
        "GET_CONTACT_DETAILS_INFO" : "اذا اردت بيانات المستخدم ،يرجى الدفع",
        "INVITED_PEOPLE_LIST" : "قائمة الأشخاص الذين قمت بدعوتهم",
        "Only_4_Spouse" : "You Can add Only 4 Spouse",
        "MERGE_TREE" : "دمج شجرة العاذلة",
        "VIEW_TREE" : "عرض شجرة العائلة",
        "MERGE_TREE_PAYMENT" : "معلومات الدفع لدمج شجرة العائلة",
        "TO_MERGE_TREE_PAY" : "لدمج شجرة العائلة يرجى الدفع",
        "LANGUAGE" : "اللغة",
        "Problem_in_Adding_Event" : "يوجد خلل في إضافة الفعالية",
        "No_Admin" : "لا يوجد معرف للقبيلة",
        "No_Admin_yet_Pay_$5_to_become_Admin" : " واصبح معرف القبيلة  5 $ لا يوجد معرف للقبيلة ادفع",
        "Now_you_are_Admin" : "الان انت معرف القبيلة",
        "Tree_Merged_succesfully" : "لقد تم دمج شجرة العائلة بنجاح",
        "No_Tokens_Found" : "لا يوجد رصيد",
        "Story_successfully_Added" : "لقد تم إضافة القصة بنجاح",
        "CONTACT_DETAILS" : " بيانات المستخدم",
        "SELECT_COUNTRY" : "اختر البلد",
        "SELECT_STATE" : "اختر الامارة/المحافظة",
        "SELECT_CITY" : "اختر المدينة",
        "ADD_SELECT_CITY" : "اضف مدينتك",
        "REQUIRED" : "البيانات مطلوبة",
        "CANCEL" : "إلغاء",
        "CONTACT_US" : "اتصل بنا",
        "Message_text" : "رسالة",
        "Message_REQUIRED" : "أدرج رسالتك من فضلك",
        "Thanks_For_Contacting" : "شكرا لك على الاتصال بنا، سوف فريقنا قريبا الحصول على اتصال معكم.",
        "Something_Went_Wrong" : "هناك خطأ ما",
        "Restricted_Families" : "هذه العائلات والعشائر مقيدة في التطبيق. الرجاء النقر على موافق للاتصال بالمسؤول",
        "Ancestry_AND_Genealogy" : "الأسلاف وعلم النسب",
        "SELECT_PAYPAL" : "PayPal / الدفع عن طريق البطاقة الائتمانية",
        "SELECT_InApp" : "InAppPurchases الدفع عن طريق",
        "SELECT_PAYMENT_METHOD" : "اختيار طريقة الدفع",
        "Ancestry_AND_Genealogy_msg" : "عزيزي المستخدم ، سوف يكون باستطاعتك قريبا ،ان تتعرف على تاريخ اجدادك وأسلافك عن طريق التتبيق ، اذا كنت مهتم اضغت نعم",
        "Tribe_Bundle" : "باقة قبيلتي",
        "Clan_Bundle" : "عشيرة باقة", 
        "Folk_Bundle" : "قوم باقة",
        "Qabilati_Bundle" : "قبيلتي باقة",
        "Remaining_view_msg" : "اذ اردت ان تتطلع على بيانات المستخدم/مستخدمة سوف يتم استعمال رصيدك",
        "WANT_MERGE" : "لديها شجرة خاصة بها. هل تريد دمج شجرة له في شجرة الخاص بك؟",
        "BECOME_ADMIN_INFO" : "قبيلتي باق $4 قبيلتي باق",
        "PAYMENT_MSG" : "اذ اردت ان تتطلع على بيانات المستخدم/مستخدمة سوف يتم استعمال رصيدك",
        "MERGE_TREE_PAYMENT_MSG" : "You are part of a tree and in order to connect to the tree you need to pay the one dollar",
        "APP_NAME" : " قبيلتي",
        "SHARING_INFO" : "يوجد قرابة مشتركة عن طريق تتبيق قبيلتي",
        "SIGN_UP_TEXT" : "تسجيل",
        "APP_TAGLINE" : "التواصل عن طريق قرابة الدم",
        "LANGUAGE_SELECTION" : "اختر لغتك المفضلة",
        "No_Notification" : "لا يوجد أي",
        "Search_Result" : "نتائج البحث",
        "Already_Account" : "هل لديك حساب مسجال ؟",
        "Your" : "ك",
        "story" : "قصة",
        "family" : "عائلة",
        "ancestry" : "أصل",
        "Change_Cover_Image" : "تغيير صورة الغلاف",
        "GET_BUNDLE_INFO" : "للحصول على بيانات احد اصدقائك او اقاربك يرجى شراء إحدا الباقات المتاحة",
        "Exit_Msg_Title" : "تسجيل الجروج من التتبيق",
        "Exit_Msg" : "هل انت متأكد من تسجيل الخروج من التتبيق",
        "Unlock_Member_MSG" : "لقد تم ضم هذا المستخدم من شجرة عائلة أخرى ، اذا اردت تغيير او حزف أيا من البيانات يرجى الدفع",
        "Unlock_Member" : "Unlock Member",
        "Invitation_Send_Successfully" : "تم إرسال الدعوة بنجاح",
        "SEND_BTN" : "ارسال",
        "selt_invites" : "لا يمكن إرسال دعوة ذاتية",
        "Track_Your_Ancestors_Path" : "تتبع مسار الأجداد الخاص بك",
        "Products" : "الباقات المتاحة",
        "Load_Products" : "تحميل الباقات",
        "Using_Apple_Pay" : "الدفع عن طريق",
        "Cover_Change_succesfully" : "تم تحديث صورة الغلاف بنجاح",
        "TERMS_Required" : "يرجى قبول البنود والشروط",
        "ARE_YOU_INTERESTED" : "إذا كنت مهتما للضغط موافق",
        "View_Tutorial" : "عرض البرنامج التعليمي"
    });

    $translateProvider.preferredLanguage('en');
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
        url: '/browse',
        views: {
            'menuContent': {
                templateUrl: 'templates/browse.html'
            }
        }
    })

    .state('language', { 
        url: '/language',
        templateUrl: 'templates/languageSelection.html',
        controller: 'languageCtrl'
    })

    .state('app.ancestry', {
        url: '/ancestry',
        views: {
            'menuContent': {
                templateUrl: 'templates/ancestry.html',
                controller: 'ancestryCtrl'
            }
        }
    })

    .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login_screen.html',
        controller: 'AppCtrl'
    })

    .state('launch', {
        cache: false,
        reload: true,
        url: '/launch/:redirectScreen',
        param:{
            redirectScreen:"dashboard",
        },
        templateUrl: 'templates/intro.html',
        controller: 'launchCtrl'
    })

    .state('launch-arabic', {
        cache: false,
        reload: true,
        url: '/launch-arabic/:redirectScreen',
        param:{
            redirectScreen:"dashboard",
        },
        templateUrl: 'templates/intro-arabic.html',
        controller: 'launchArabicCtrl'
    })

    .state('signup', {
        cache: false,		  
        url: '/signup/:socialData',
        param:{
            socialData:null,
        },
        templateUrl: 'templates/signup.html',
        controller: 'SignUpCtrl'
    })

    .state('signupType', {
        cache: false,		  
        url: '/signupType',
        templateUrl: 'templates/signup_type.html',
        controller: 'LoginwithFacebook'
    })

    .state('app.editTreeNode', {
        cache: false,
        reload: true, 
        url: '/editTreeNode/:nodeID',
        param:{
            nodeID:"",
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/editTreeNode.html',
                controller: 'editTreeCtrl'
            }
        }
    })

    .state('app.tree',{
        cache: false,
        url: '/tree/:nodeID',
        param:{
            nodeID:"",
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/tree.html',
                controller: 'verticalTreeCtrl'
            }
        }
    })

    .state('app.paymentScreen', {
        cache: false,
        url: '/paymentScreen/:nodeID/:type/:redirectScreen',
        param:{
            nodeID:"",
            type:"",
            redirectScreen:"",
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/paymentScreen.html',
                controller: 'payScreenCtrl'
            }
        }
    })


    .state('contacts', { 
        cache: false,
        url: '/contacts/:nodeID/:userData/:redirectScreen',
        param:{
            nodeID:"",
            userData:null,
            redirectScreen:"",
        },
        templateUrl: 'templates/contacts.html',
        controller: 'payScreenCtrl'
    })

    .state('contactUS', { 
        url: '/contactUS/:type',
         param:{
            type:"Restrict",
        },
        cache: false,
        templateUrl: 'templates/contactUS.html',
        controller: 'contactController'
    })

    .state('app.contact_admin',{
        cache: false,
        url: '/contact_admin/:type',
        param:{
            type:"",
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/contact_admin.html',
                controller: 'contactController'
            }
        }
    })
    
    .state('app.searchScreen', {
		cache: false,
        url: '/searchScreen/:nodeID',
        reload: true,
        param:{
            nodeID:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/searchScreen.html',
                controller: 'searchScreenCtrl'
            }
        }
    })

    .state('app.notificationScreen', {
        cache: false,
        url: '/notificationScreen/:nodeID',
        reload: true,
        param:{
            nodeID:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/notificationScreen.html',
                controller: 'notificationCtrl'
            }
        }
    })

    .state('editEvent',{
        cache: false,
        reload: true, 
        url: '/editEvent/:eventID/:eventTitle/:eventDescription/:location/:eventDate/:nodeID_fk',
        param:{
            eventID:"",
            eventTitle:"",
            eventDescription:"",
            location: "",
            eventDate:"",
            nodeID_fk:""
        },
        templateUrl: 'templates/editEvent.html',
        controller: 'editEventCtrl'
    })
	
	.state('popover',{
        url: '/popover',
        templateUrl: 'templates/popover.html',
        controller: 'storyCtrl'
    })

    .state('editStory',{
        cache: false,
        reload: true, 
        url: '/editStory/:lsID/:title/:description/:location/:stodyDate/:nodeID_fk',
        param:{
            lsID:"",
            title:"",
            description:"",
            location: "",
            stodyDate:"",
            nodeID_fk:""
        },
        templateUrl: 'templates/editStory.html',
        controller: 'editProfileCtrl'
    })

    .state('editPhoto',{
        cache: false,
        reload: true,        
        url: '/editPhoto/:galleryID/:title/:description/:photoDate/:photo/:location/:nodeID_fk',
        param:{
            galleryID:"",
            title:"",
            description:"",
            photoDate: "",
            photo:"",
            location:"",
            nodeID_fk:""
        },
        templateUrl: 'templates/editPhoto.html',
        controller: 'editGalleryCtrl'
    })

    .state('app.gallery_image_save',{
        cache: false,
        reload: true, 
        url: '/gallery_image_save/:nodeID/:activeTab',
        param:{
            nodeID:"",
            activeTab:"c"
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery_image_save.html',
                controller: 'galleryCtrl'
            }
        }
    })

    .state('app.changeCover',{
        cache: false,
        reload: true,  
        url: '/changeCover/:nodeID',
        param:{
            nodeID:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/changeCover.html',
                controller: 'changeCoverCtrl'
            }
        }
    })

    .state('app.FamilyMemberLifeStory', {
        cache: false,
        reload: true, 		  
        url: '/FamilyMemberLifeStory/:nodeID/:activeTab',
        param:{
            nodeID:"",
            activeTab:"a"
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/FamilyMemberLifeStory.html',
                controller: 'storyCtrl'
            }
        }
    })

    .state('app.becomeAdmin', {
        url: '/becomeAdmin/:nodeID',
        param:{
            nodeID:""      
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/becomeAdmin.html',
                controller: 'becomeAdminCtrl'
            }
        }
    })
  
    .state('app.userProfile', {
        cache: false, 
        reload: true,     
        url: '/userProfile/:nodeID/:activeTab',
        param:{
            nodeID:"",
            activeTab:"a"
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/userProfile.html',
                controller: 'nodeCtrl'
            }
        }
    })

    .state('app.addLifeStory', {
        cache: false,
        reload: true,      
        url: '/addLifeStory/:nodeID/:activeTab',
        param:{
            nodeID:"",
            activeTab:"a"
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/addLifeStory.html',
                controller: 'profileCtrl'
            }
        }
    })

    .state('app.addEvent', {
        cache: false, 
        reload: true,     
        url: '/addEvent/:nodeID/:activeTab',
        param:{
            nodeID:"",
            activeTab:"a"
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/addEvent.html',
                controller: 'eventCtrl'
            }
        }
    })

    .state('app.aboutUs', {
        cache: false,
        reload: true,  
        url: '/aboutUs',
        views: {
            'menuContent': {
                templateUrl: 'templates/aboutUs.html',
                controller: 'aboutUsCtrl'
            }
        }
    })

    .state('app.howToUse', {
        cache: false, 
        reload: true, 
        url: '/howToUse',
        views: {
            'menuContent': {
                templateUrl: 'templates/howToUse.html',
                controller: 'aboutUsCtrl'
            }
        }
    })
	
	.state('app.payScreenForMerge', {
        cache: false,
        reload: true,
        url: '/payScreenForMerge/:existTreeID/:existNodeID/:newID',
		param:{
            existTreeID:"",
            existNodeID:"",
            newID:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/payScreenForMerge.html',
                controller: 'payScreenCtrl'
            }
        }
    })

    .state('app.treeSettings', {
		cache: false,
        url: '/treeSettings',
        views: {
            'menuContent': {
                templateUrl: 'templates/treeSettings.html',
                controller: 'treeInviteCtrl'
            }
        }
    })
	
    .state('app.InAppPurchaseForm', {
        cache: false,
        url: '/InAppPurchaseForm/:payType/:nodeID/:redirectScreen',
        param:{
            payType:"",
            nodeID:"",
            redirectScreen:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/InAppPurchaseForm.html',
                controller: 'inAppCtrl'
            }
        }
    })

    .state('app.unlockNode', {
        url: '/unlockNode/:nodeID/:redirectScreen',
        param:{
            nodeID:"",
            redirectScreen:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/unlockNode.html',
                controller: 'unlockNodeCtrl'
            }
        }
    })

    .state('app.unlockNodeForm', {
        cache: false,
        url: '/unlockNodeForm/:payType/:nodeID/:redirectScreen',
        param:{
            payType:"",
            nodeID:"",
            redirectScreen:""
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/unlockNodeForm.html',
                controller: 'unlockNodeCtrl'
            }
        }
    })

	.state('app.changeLanguage', {
		cache: false,
        url: '/changeLanguage',
        views: {
            'menuContent': {
                templateUrl: 'templates/changeLanguage.html',
                controller: 'changelanguageCtrl'
            }
        }
    })

    .state('app.form', {
		cache: false,
        url: '/form/:nodeID/:activeTab',
        param:{
            nodeID:"",
            activeTab:"a"
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/form.html',
                controller: 'addNodeController'
            }
        }
    })

    .state('app.ParentListBeforeAddingChild', {
        url: '/ParentListBeforeAddingChild/:nodeID/:parentData',
        param:{
            nodeID:"",
            parentData:null
        },
        views: {
            'menuContent': {
                templateUrl: 'templates/ParentListBeforeAddingChild.html',
                controller: 'addNodeController'
            }
        }
    })

    .state('app.generationPaymentScreen', {
        cache: false,
        param:{
             nodeID:"",
             paymentData:null
        },
        url: '/generationPaymentScreen/:nodeID/:paymentData',
        views: {
            'menuContent': {
                templateUrl: 'templates/generationPaymentScreen.html',
                controller: 'addNodeController'
            }
        },
    })

    .state('app.getInvitePeople', {
        url: '/getInvitePeople',
        reload: true,
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/getInvitePeople.html',
                controller: 'getInviteCtrl'
            }
        }
    })

   .state('app.logout', {
        url: '/logout',
        views: {
            'menuContent': {
                templateUrl: 'templates/logout.html',
                //controller: 'SignupCtrl'
            }
        }
    });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/language');
});