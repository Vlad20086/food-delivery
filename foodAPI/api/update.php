<?php
    // error_reporting(0);
    error_reporting(E_ALL);
    ini_set('display_errors', 1); 

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    include_once '../config/database.php';

    include_once '../class/admins.php';
    include_once '../class/customers.php';
    include_once '../class/foods.php';
    include_once '../class/feedbacks.php';
    include_once '../class/webcontents.php';
    
    $database = new Database();
    $db = $database->getConnection();

    // $data = json_decode(file_get_contents("php://input"));
    // echo $data->id;
    if(isset($_GET['admin'])){
        $item = new Admin($db);
        $admin_id = preg_replace('/\D/', '', $_POST['admin_id']);
        $item->id = (int)$admin_id;
        $item->email==$_POST['email'];
        $item->getSingleAdminById();
        $item->name = $_POST['name'];
        $item->email = $_POST['email'];
        if($item->password == $_POST['oldpassword']){
            // profile update
                $pictureMsg = false;
            if ($_POST['sentPicture']=="true") {
                $upload_path = __DIR__."/images/admin/".basename($_FILES["picture"]['name']);
                $valid_ext = array('png','jpeg','jpg','gif');
                $ext = strtolower(pathinfo($_FILES['picture']['name'], PATHINFO_EXTENSION));
                if(in_array($ext,$valid_ext)){  
                    if(file_exists($upload_path)){
                        $filename = basename($_FILES['picture']['name'],".".$ext).rand().".".$ext;
                        $upload_path = __DIR__."/images/admin/".$filename;
                        $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/admin/".$filename;
                        // echo json_encode(array("Error"=>"path exits"));   
                    }else {
                        $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/admin/".basename($_FILES["picture"]['name']);
                        // echo json_encode(array("Error"=>"path does not exits"));   
                    }
                    if($_FILES['picture']['size']/1024 > 100 ){
                        $database->compressedImage($_FILES['picture']['tmp_name'],$upload_path,40);   
                    }else if($_FILES['picture']['size']/1024 < 100 ) {
                        $database->compressedImage($_FILES['picture']['tmp_name'],$upload_path,60);   
                    }
                        $pictureMsg = true;
                        $item->profile = $url;
                }else {
                    echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
                }
            }
            //profile update end
            if($item->updateAdmin()){
                echo json_encode(array("message"=>"Admin Data update", "status"=>1));
            } else{
                echo json_encode(array("message"=>"Admin Data could not update", "status"=>0));
            }
        }else {
            echo json_encode(array("message"=>"Old Password was incorrect", "status"=>2));
        }
    }else if(isset($_GET['food'])){
        $item = new Food($db);
        $item->admin_id = (int)$_POST['adminId'];
        $item->name = $_POST['name'];
        $item->short_description = $_POST['description'];
        $item->price = $_POST['price'];
        $item->picture = "";
        $pictureMsg = false;
        if ($_POST['sentPicture']=="true") {
            $upload_path = __DIR__."/images/food_image/".basename($_FILES["picture"]['name']);
            $valid_ext = array('png','jpeg','jpg','gif');
            $ext = strtolower(pathinfo($_FILES['picture']['name'], PATHINFO_EXTENSION));
            if(in_array($ext,$valid_ext)){  
                if(file_exists($upload_path)){
                    $filename = basename($_FILES['picture']['name'],".".$ext).rand().".".$ext;
                    $upload_path = __DIR__."/images/food_image/".$filename;
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/food_image/".$filename;
                    // echo json_encode(array("Error"=>"path exits"));   
                }else {
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/food_image/".basename($_FILES["picture"]['name']);
                    // echo json_encode(array("Error"=>"path does not exits"));   
                }
                if($_FILES['picture']['size']/1024 > 100 ){
                    $database->compressedImage($_FILES['picture']['tmp_name'],$upload_path,40);   
                }else if($_FILES['picture']['size']/1024 < 100 ) {
                    $database->compressedImage($_FILES['picture']['tmp_name'],$upload_path,60);   
                }
                    $pictureMsg = true;
                    $item->picture = $url;
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }else {
            if($data = $item->getSingleFood($_GET['food_id'])){
                $item->picture = $data['picture'];
                // echo json_encode(array("Error"=>"Old path fetched", "file"=>$_FILES['picuture']['name']));   
            }else {
                echo json_encode(array("Error"=>"Old path could not fetched"));   
            }
        }
        if($item->updateFood($_GET['food_id'])){
            echo json_encode(array("message"=>"Food Data has been updated", "status"=>1, "pictureChanged"=>$pictureMsg));
        } else{
            echo json_encode(array("message"=>"Food Data could not been updated", "status"=>0));
        }
    }else if(isset($_GET['orderStatus'])){
        // ORDER STATUS : 
        // 4. Order Placed 
        // 3. Order Cancelled 
        // 2. Order Confirmed 
        // 1. Food on the way 
        // 0. Delivered
        $item = new Customer($db);
        $item->order_id = $_GET['order_id'];
        $item->order_status = $_GET['order_status'];
        if($item->orderStatus()){
            echo json_encode(array("message"=>"Order Status has been updated", "status"=>1));
        } else{
            echo json_encode(array("message"=>"Order Status could not update", "status"=>0));
        }
    }else if(isset($_GET['webcontent'])){
        $item = new WebContent($db);
        $data = $item->getSingleWebContent();
        $item->website_name = $_POST['website_name'];
        $item->home_heading = $_POST['home_heading'];
        $item->home_center_button = $_POST['home_center_button'];
       
        $item->navbar_home = $_POST['navbar_home'];
        $item->navbar_status = $_POST['navbar_status'];
        $item->navbar_menu = $_POST['navbar_menu'];
        $item->navbar_about = $_POST['navbar_about'];
        $item->navbar_contact = $_POST['navbar_contact'];
       
        $item->about_heading = $_POST['about_heading'];
        $item->about_description = $_POST['about_description'];
        $item->facebook_link = $_POST['link_facebook'];
        $item->youtube_link = $_POST['link_youtube'];
        $item->whatsapp_link = $_POST['link_whatsapp'];
        $item->email_link = $_POST['link_email'];
        // $item->home_heading_theme1 = isset($_POST['home_heading_theme1']);
        // $item->home_heading_theme2 = isset($_POST['home_heading_theme2']);
        // $item->home_heading_theme3 = isset($_POST['home_heading_theme3']);
        if ($_POST['theme1']=="true") {
            $upload_path = __DIR__."/images/web-content/".basename($_FILES["home_heading_theme1"]['name']);
            $valid_ext = array('png','jpeg','jpg','gif');
            $ext = strtolower(pathinfo($_FILES['home_heading_theme1']['name'], PATHINFO_EXTENSION));
            if(in_array($ext,$valid_ext)){  
                if(file_exists($upload_path)){
                    $filename = basename($_FILES['home_heading_theme1']['name'],".".$ext).rand().".".$ext;
                    $upload_path = __DIR__."/images/web-content/".$filename;
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/web-content/".$filename;
                    // echo json_encode(array("Error"=>"path exits"));   
                }else {
                    $url = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/web-content/".basename($_FILES["home_heading_theme1"]['name']);
                    // echo json_encode(array("Error"=>"path does not exits"));   
                }
                if($_FILES['home_heading_theme1']['size']/1024 > 100 ){
                    $database->compressedImage($_FILES['home_heading_theme1']['tmp_name'],$upload_path,40);   
                }else if($_FILES['home_heading_theme1']['size']/1024 < 100 ) {
                    $database->compressedImage($_FILES['home_heading_theme1']['tmp_name'],$upload_path,60);   
                }
                    $item->home_heading_theme1 = $url;
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }
        if ($_POST['theme3']=="true") {
            $upload_path3 = __DIR__."/images/web-content/".basename($_FILES["home_heading_theme3"]['name']);
            $valid_ext3 = array('png','jpeg','jpg','gif');
            $ext3 = strtolower(pathinfo($_FILES['home_heading_theme3']['name'], PATHINFO_EXTENSION));
            if(in_array($ext3,$valid_ext3)){  
                if(file_exists($upload_path)){
                    $filename3 = basename($_FILES['home_heading_theme3']['name'],".".$ext3).rand().".".$ext3;
                    $upload_path3 = __DIR__."/images/web-content/".$filename3;
                    $url3 = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/web-content/".$filename3;
                    // echo json_encode(array("Error"=>"path exits"));   
                }else {
                    $url3 = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/web-content/".basename($_FILES["home_heading_theme3"]['name']);
                    // echo json_encode(array("Error"=>"path does not exits"));   
                }
                if($_FILES['home_heading_theme3']['size']/1024 > 100 ){
                    $database->compressedImage($_FILES['home_heading_theme3']['tmp_name'],$upload_path3,40);   
                }else if($_FILES['home_heading_theme3']['size']/1024 < 100 ) {
                    $database->compressedImage($_FILES['home_heading_theme3']['tmp_name'],$upload_path3,60);   
                }
                    $item->home_heading_theme3 = $url3;
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }
        if ($_POST['theme2']=="true") {
            $upload_path2 = __DIR__."/images/web-content/".basename($_FILES["home_heading_theme2"]['name']);
            $valid_ext2 = array('png','jpeg','jpg','gif');
            $ext2 = strtolower(pathinfo($_FILES['home_heading_theme2']['name'], PATHINFO_EXTENSION));
            if(in_array($ext2,$valid_ext2)){  
                if(file_exists($upload_path)){
                    $filename2 = basename($_FILES['home_heading_theme2']['name'],".".$ext2).rand().".".$ext2;
                    $upload_path2 = __DIR__."/images/web-content/".$filename2;
                    $url2 = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/web-content/".$filename2;
                    // echo json_encode(array("Error"=>"path exits"));   
                }else {
                    $url2 = "https://".$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/images/web-content/".basename($_FILES["home_heading_theme2"]['name']);
                    // echo json_encode(array("Error"=>"path does not exits"));   
                }
                if($_FILES['home_heading_theme2']['size']/1024 > 100 ){
                    $database->compressedImage($_FILES['home_heading_theme2']['tmp_name'],$upload_path2,40);   
                }else if($_FILES['home_heading_theme2']['size']/1024 < 100 ) {
                    $database->compressedImage($_FILES['home_heading_theme2']['tmp_name'],$upload_path2,60);   
                }
                    $item->home_heading_theme2 = $url2;
            }else {
                echo json_encode(array("message"=>"File formate is not correct ", "status"=>0));
            }
        }
        // echo json_encode(array("message"=>"Web Content has been updated", "status"=>$));
        if($item->updateWebContent()){
            echo json_encode(array("message"=>"Web Content has been updated", "status"=>1));
        }else {
            echo json_encode(array("message"=>"Web Content could not updated", "status"=>0));
        }
        
    }else{
        echo json_encode(array("message"=>"No requested method sent by client", "status"=>0));
    }
?>