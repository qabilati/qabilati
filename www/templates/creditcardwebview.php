<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
error_reporting(E_ALL);
require_once("2checkout/lib/Twocheckout.php");
if(isset($_POST['token']))
{
	Twocheckout::privateKey('F20D7C01-84F6-4716-A207-48D2DED1EF5A');
	Twocheckout::sellerId('901368621');
 	Twocheckout::sandbox(true);  #Uncomment to use Sandbox

	try {
	    $charge = Twocheckout_Charge::auth(array(
	        "merchantOrderId" => "123",
	        "token" => $_POST['token'],
	        "currency" => 'USD',
	        "total" => '10.00',
	        "billingAddr" => array(
	            "name" => 'Testing Tester',
	            "addrLine1" => '123 Test St',
	            "city" => 'Columbus',
	            "state" => 'OH',
	            "zipCode" => '43123',
	            "country" => 'USA',
	            "email" => 'testingtester@2co.com',
	            "phoneNumber" => '555-555-5555'
	        ),
	        "shippingAddr" => array(
	            "name" => 'Testing Tester',
	            "addrLine1" => '123 Test St',
	            "city" => 'Columbus',
	            "state" => 'OH',
	            "zipCode" => '43123',
	            "country" => 'USA',
	            "email" => 'testingtester@2co.com',
	            "phoneNumber" => '555-555-5555'
	        )
	    ), 'array');
	    if ($charge['response']['responseCode'] == 'APPROVED') {
	        echo "Thanks for your Order!";


	    }
	} catch (Twocheckout_Error $e) {
	    $e->getMessage();
	}
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Example Form</title>
  <script type="text/javascript" src="https://www.2checkout.com/checkout/api/2co.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
</head>
<body>
<form id="myCCForm" action="http://qabilati.com/creditcardwebview.php" method="post">
  <input name="token" type="hidden" value="" />
  <div>
    <label>
      <span>Card Number</span>
      <input id="ccNo" type="text" value="" autocomplete="off" required />
    </label>
  </div>
  <div>
    <label>
      <span>Expiration Date (MM/YYYY)</span>
      <input id="expMonth" type="text" size="2" required />
    </label>
    <span> / </span>
    <input id="expYear" type="text" size="4" required />
  </div>
  <div>
    <label>
      <span>CVC</span>
      <input id="cvv" type="text" value="" autocomplete="off" required />
    </label>
  </div>
  <input type="submit" value="Submit Payment" />
</form>

<script>
  // Called when token created successfully.
  var successCallback = function(data) {

    var myForm = document.getElementById('myCCForm');

    // Set the token as the value for the token input
    myForm.token.value = data.response.token.token;
    // IMPORTANT: Here we call `submit()` on the form element directly instead of using jQuery to prevent and infinite token request loop.
    myForm.submit();
  };

  // Called when token creation fails.
  var errorCallback = function(data) {
    // Retry the token request if ajax call fails
    if (data.errorCode === 200) {
       // This error code indicates that the ajax call failed. We recommend that you retry the token request.
    } else {
    	alert(data.errorMsg);
    }
  };

  var tokenRequest = function() {
    // Setup token request arguments
    var args = {
      sellerId: "901368621",
      publishableKey: "538B5D9D-C9C6-49A7-B899-FFCFE11E3D8C",
      ccNo: $("#ccNo").val(),
      cvv: $("#cvv").val(),
      expMonth: $("#expMonth").val(),
      expYear: $("#expYear").val()
    };
    
    // Make the token request
    TCO.requestToken(successCallback, errorCallback, args);
  };

  $(function() {
    // Pull in the public encryption key for our environment
    TCO.loadPubKey('sandbox');

    $("#myCCForm").submit(function(e) {
      // Call our token request function
      tokenRequest();

      // Prevent form from submitting
      return false;
    });
  });

</script>
</body>
</html>