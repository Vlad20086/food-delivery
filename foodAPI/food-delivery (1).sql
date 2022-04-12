-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2022 at 10:31 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food-delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `profile` text NOT NULL DEFAULT 'https://image.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `name`, `email`, `password`, `profile`, `timestamp`) VALUES
(45, 'Sajid Ali', 'sajid@gmail.com', '123', 'https://image.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;#039;	', '2022-04-11 18:00:54'),
(61, 'admin@gmail.com', 'admin@gmail.com', '123', '\'https://image.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg\'	', '2022-04-11 18:44:28'),
(62, 'admin1@gmail.com', 'admin1@gmail.com', '123', '\'https://image.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg\'	', '2022-04-11 18:45:29');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `food_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` text NOT NULL,
  `delivery_address` text NOT NULL,
  `order_status` int(11) NOT NULL DEFAULT 4,
  `order_id` text DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `food_id`, `name`, `phone_number`, `delivery_address`, `order_status`, `order_id`, `order_date`) VALUES
(973, 30, 'karina', '7065221377', 'delhi', 0, '256741', '2022-04-11 17:41:58'),
(974, 30, 'sajid', '7065221377', 'delhi', 0, '439550', '2022-04-11 15:38:56'),
(981, 29, 'Ok', 'ok', 'ok', 2, '409248', '2022-04-11 17:41:49'),
(982, 30, 'Ok', 'ok', 'ok', 2, '409248', '2022-04-11 17:41:49');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT 0,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` text NOT NULL,
  `description` text NOT NULL,
  `action` int(11) NOT NULL DEFAULT 0,
  `display` int(11) NOT NULL DEFAULT 0,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `admin_id`, `name`, `email`, `phone_number`, `description`, `action`, `display`, `timestamp`) VALUES
(7, 0, 'katrina kaif', 'katrina@gmail.com', '7065221377', 'Your Foods is delicious, I want to book your food for my upcoming party. ', 0, 0, '2022-04-04 18:16:37');

-- --------------------------------------------------------

--
-- Table structure for table `testy_food`
--

CREATE TABLE `testy_food` (
  `food_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `short_description` text NOT NULL,
  `picture` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testy_food`
--

INSERT INTO `testy_food` (`food_id`, `admin_id`, `name`, `price`, `short_description`, `picture`, `timestamp`) VALUES
(1, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:51:24'),
(2, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(3, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(4, 0, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-04 20:38:47'),
(5, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(6, 0, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-04 20:22:43'),
(7, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(8, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(10, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(11, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(12, 0, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-04 20:37:30'),
(13, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(14, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(15, 0, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-04 20:37:24'),
(16, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(17, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(18, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(20, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(21, 0, ' I love food', 300, 'Pan-fried masala paneer', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-09 07:53:00'),
(29, 1, 'Paneer Grilled Sandwich', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-02 18:52:02'),
(30, 0, 'Paneer ', 200, 'Pan-fried masala paneer.', 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wzfq7djolqxgdhghebbq', '2022-04-09 07:49:03');

-- --------------------------------------------------------

--
-- Table structure for table `web_contents`
--

CREATE TABLE `web_contents` (
  `id` int(11) NOT NULL,
  `webiste_name` varchar(255) NOT NULL,
  `home_heading` text NOT NULL,
  `home_header_theme` text NOT NULL,
  `home_center_button` varchar(255) NOT NULL,
  `navbar_home` varchar(255) NOT NULL,
  `navbar_menu` varchar(255) NOT NULL,
  `navbar_status` int(11) NOT NULL,
  `navbar_about` int(11) NOT NULL,
  `navbar_contact` int(11) NOT NULL,
  `about_heading` varchar(255) NOT NULL,
  `about_description` text NOT NULL,
  `facebook_link` text NOT NULL,
  `youtube_link` text NOT NULL,
  `whatsapp_link` text NOT NULL,
  `email_link` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `testy_food`
--
ALTER TABLE `testy_food`
  ADD PRIMARY KEY (`food_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `web_contents`
--
ALTER TABLE `web_contents`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=983;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `testy_food`
--
ALTER TABLE `testy_food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `web_contents`
--
ALTER TABLE `web_contents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
