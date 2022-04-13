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
    }else{
        echo json_encode(array("message"=>"No requested method sent by client", "status"=>0));
    }
?>