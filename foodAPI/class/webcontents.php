<?php
    class WebContent{
        // Connection
        private $conn;
        // Table
        private $db_table = "web_contents";
        // Columns
        public $id;
        public $website_name;
        public $home_heading;
        public $home_heading_theme1;
        public $home_heading_theme2;
        public $home_heading_theme3;
        public $home_center_button;

        public $navbar_home;
        public $navbar_status;
        public $navbar_contact;
        public $navbar_about;
        public $navbar_menu;

        public $about_heading;
        public $about_description;

        public $facebook_link;
        public $youtube_link;
        public $email_link;
        public $whatsapp_link;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }
        // GET ALL
        public function getWebContent(){
            
            $sqlQuery = "SELECT * FROM " . $this->db_table . " ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }
        
        public function updateWebContent(){
            $sqlQuery = "UPDATE ". $this->db_table ."
                    SET
                    website_name = :website_name,
                    home_heading = :home_heading,
                    home_heading_theme1 = :home_heading_theme1,
                    home_heading_theme2 = :home_heading_theme2,
                    home_heading_theme3 = :home_heading_theme3,
                    home_center_button = :home_center_button,  
                    navbar_home = :navbar_home,
                    navbar_status = :navbar_status,
                    navbar_menu = :navbar_menu,
                    navbar_about = :navbar_about,
                    navbar_contact = :navbar_contact,
                    about_heading = :about_heading,
                    about_description = :about_description,
                    facebook_link = :facebook_link,
                    youtube_link = :youtube_link,
                    whatsapp_link = :whatsapp_link,
                    email_link = :email_link";
                    
                    $stmt = $this->conn->prepare($sqlQuery);

                    $stmt->bindParam(":website_name", $this->website_name);
                    $stmt->bindParam(":home_heading", $this->home_heading);
                    $stmt->bindParam(":home_heading_theme1", $this->home_heading_theme1);
                    $stmt->bindParam(":home_heading_theme2", $this->home_heading_theme2);
                    $stmt->bindParam(":home_heading_theme3", $this->home_heading_theme3);
                    $stmt->bindParam(":home_center_button", $this->home_center_button);
                    $stmt->bindParam(":navbar_home", $this->navbar_home);
                    $stmt->bindParam(":navbar_status", $this->navbar_status);
                    $stmt->bindParam(":navbar_menu", $this->navbar_menu);
                    $stmt->bindParam(":navbar_about", $this->navbar_about);
                    $stmt->bindParam(":navbar_contact", $this->navbar_contact);
                    $stmt->bindParam(":about_heading", $this->about_heading);
                    $stmt->bindParam(":about_description", $this->about_description);
                    $stmt->bindParam(":facebook_link", $this->facebook_link);
                    $stmt->bindParam(":youtube_link", $this->youtube_link);
                    $stmt->bindParam(":whatsapp_link", $this->whatsapp_link);
                    $stmt->bindParam(":email_link", $this->email_link);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        public function getSingleWebContent(){
            $sqlQuery = "SELECT
                        *
                      FROM
                        ". $this->db_table ." ";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();

            $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
            if($dataRow){
                $this->home_heading_theme3 = $dataRow['home_heading_theme3'];
                $this->home_heading_theme2 = $dataRow['home_heading_theme2'];
                $this->home_heading_theme1 = $dataRow['home_heading_theme1'];
            }   
            return $dataRow;
        }
    }
?>