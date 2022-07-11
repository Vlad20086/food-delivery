<?php 
    class Database {
        // private $host = "127.0.0.1";
        // private $database_name = "food-delivery";
        // private $username = "root";
        // private $password = "";
        public $conn;
        public function getConnection(){
            $this->conn = null;
            try{
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->database_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            }catch(PDOException $exception){
                echo "Database could not be connected: " . $exception->getMessage();
            }
            return $this->conn;
        }

        function compressedImage($source, $path, $quality) {
            $info = getimagesize($source);
            if ($info['mime'] == 'image/jpeg') 
                $image = imagecreatefromjpeg($source);
            elseif ($info['mime'] == 'image/gif') 
                $image = imagecreatefromgif($source);
            elseif ($info['mime'] == 'image/png') 
                $image = imagecreatefrompng($source);
            imagejpeg($image, $path, $quality);
       }
    }
?>