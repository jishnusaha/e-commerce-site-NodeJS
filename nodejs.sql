-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2019 at 01:59 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `customerid` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'incart',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`productid`, `quantity`, `customerid`, `status`, `id`) VALUES
(12, 7, 10, 'canceled', 2),
(2, 2, 10, 'canceled', 3),
(7, 2, 10, 'accept', 8),
(14, 3, 10, 'canceled', 12),
(20, 4, 10, 'canceled', 14),
(20, 16, 10, 'ordered', 17),
(20, 20, 10, 'ordered', 18),
(4, 5, 10, 'ordered', 19);

-- --------------------------------------------------------

--
-- Stand-in structure for view `cartinfo`
-- (See below for the actual view)
--
CREATE TABLE `cartinfo` (
`productid` int(11)
,`quantity` int(11)
,`customerid` int(11)
,`status` varchar(20)
,`id` int(11)
,`name` varchar(200)
,`unit_price` decimal(61,0)
,`total_price` decimal(65,0)
,`maxQuantity` int(10)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `cartinfoshopkeeper`
-- (See below for the actual view)
--
CREATE TABLE `cartinfoshopkeeper` (
`productid` int(11)
,`quantity` int(11)
,`customerid` int(11)
,`status` varchar(20)
,`id` int(11)
,`name` varchar(200)
,`unit_price` decimal(61,0)
,`product_quantity` int(10)
,`catagory` varchar(50)
,`specification` varchar(500)
);

-- --------------------------------------------------------

--
-- Table structure for table `comment_rating`
--

CREATE TABLE `comment_rating` (
  `productid` int(11) NOT NULL,
  `customerid` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `rating` int(11) NOT NULL,
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment_rating`
--

INSERT INTO `comment_rating` (`productid`, `customerid`, `comment`, `rating`, `username`) VALUES
(8, 2, 'good product', 5, 'jishnu saha'),
(2, 10, 'good product', 4, 'jishnu saha'),
(11, 10, 'nice it is', 1, 'jishnu saha'),
(16, 10, 'awesome', 5, 'jishnu saha'),
(12, 10, 'nice product', 5, 'jishnu saha'),
(3, 10, 'bad', 4, 'jishnu saha'),
(14, 10, 'good', 4, 'jishnu saha'),
(20, 10, 'good product', 4, 'jishnu saha');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `salerid` int(11) NOT NULL,
  `specification` varchar(500) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `type` varchar(20) NOT NULL,
  `quantity` int(10) NOT NULL,
  `catagory` varchar(50) NOT NULL,
  `price` int(10) NOT NULL,
  `discount` int(50) NOT NULL,
  `rating` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `name`, `salerid`, `specification`, `gender`, `type`, `quantity`, `catagory`, `price`, `discount`, `rating`) VALUES
(1, 'nokia 1200', 1, 'Color : blackSize : M', 'common', 'nokia', 30, 'mobile phone', 2000, 10, '0'),
(2, 'nokia 3110', 1, 'Color : black\r\nSize : M', 'common', 'nokia', 20, 'mobile phone', 2000, 0, '4'),
(3, 'galaxy j5', 1, 'Color : black\r\nSize : 6 inch', 'common', 'samsung', 40, 'mobile phone', 20000, 5, '4'),
(4, 'galaxy j7', 1, 'Color : black\r\nSize : 5.5 inch', 'common', 'samsung', 25, 'mobile phone', 60000, 0, '0'),
(5, 'iphone 6', 1, 'Color : black\r\nSize : 5 inch', 'common', 'iphone', 35, 'mobile phone', 50000, 0, '0'),
(6, 'iphone 7', 1, 'Color : black\r\nSize : 6 inch', 'common', 'iphone', 15, 'mobile phone', 60000, 0, '0'),
(7, 'HP Pavilion 15P', 1, 'Color : black\r\nSize : 15 inch', 'common', 'hp', 42, 'computer', 70000, 0, '0'),
(8, 'HP Probook 440', 1, 'Color : black\r\nSize : 16 inch', 'common', 'hp', 30, 'computer', 80000, 10, '5'),
(9, 'dell inspiron 13', 1, 'Color : black\r\nSize : 16 inch', 'common', 'dell', 60, 'computer', 60000, 0, '0'),
(10, 'dell inspiron 15', 1, 'Color : black\r\nSize : 15 inch', 'common', 'dell', 40, 'computer', 60000, 0, '0'),
(11, 'asus zenbook 3', 1, 'Color : black\r\nSize : 14 inch\r\n', 'common', 'asus', 35, 'computer', 60000, 0, '1'),
(12, 'asus zenbook 13', 1, 'Color : black\r\nSize : 16 inch', 'common', 'asus', 50, 'computer', 45000, 0, '5'),
(13, 'Sony KDL-40EX650', 1, 'Color : black\r\nSize : 12 inch', 'common', 'tv', 20, 'electronics', 20000, 0, '0'),
(14, 'LG 43LH576T', 1, 'Color : black\r\nSize : 13 inch\r\n', 'common', 'tv', 40, 'electronics', 25000, 0, '4'),
(15, 'ION 1500 VA IPS', 1, 'Color : black\r\nSize : 6 inch', 'common', 'ips', 40, 'electronics', 20000, 0, '0'),
(16, 'Singer IPS', 1, 'Color : black\r\nSize : 6 inch', 'common', 'ips', 15, 'electronics', 40000, 15, '5'),
(17, 'Hisense HR6TFF437SD', 1, 'Color : black\r\nSize :  M\r\n', 'common', 'refrigerator', 20, 'electronics', 20000, 0, '0'),
(18, 'Kenmore 50043', 1, 'Color : black\r\nSize : M', 'common', 'refrigerator', 30, 'electronics', 60000, 0, '0'),
(19, 'Canon EOS', 1, 'Color : black\r\nSize : M', 'common', 'camera', 20, 'entertainments', 30000, 0, '0'),
(20, 'Nikon D3400', 1, 'Color : black\r\nSize : M', 'common', 'camera', 20, 'entertainments', 20000, 20, '4'),
(21, 'AmpliVox', 1, 'Color : black\r\nSize : M', 'common', 'sound system', 25, 'entertainments', 20000, 0, '0'),
(22, 'SVS Ultra Tower Surround', 1, 'Color : black\r\nSize : M', 'common', 'sound system', 30, 'entertainments', 25000, 0, '0'),
(23, 'Kitchen Toys', 1, 'Color : black\r\nSize : M', 'common', 'toys', 20, 'entertainments', 5000, 0, '0'),
(24, 'Large Minion Soft Toy', 1, 'Color : black\r\nSize : M', 'common', 'toys', 40, 'entertainments', 2000, 0, '0'),
(25, 'Europe Immigration Service', 1, 'Color : black\r\nSize : M', 'common', 'health care', 25, 'daily needs', 20000, 0, '0'),
(26, 'Congressman Don Bacon', 1, 'Color : black\r\nSize : M', 'common', 'health care', 25, 'daily needs', 20000, 10, '0'),
(27, 'Indoor Lighting', 1, 'Color : black\r\nSize : L', 'common', 'lighting', 25, 'daily needs', 2000, 0, '0'),
(28, 'Event Lighting', 1, 'Color : black\r\nSize : M', 'common', 'lighting', 40, 'daily needs', 1500, 0, '0'),
(29, 'Usha Maxx Air', 1, 'Color : black\r\nSize : S', 'common', 'fan', 20, 'daily needs', 2000, 0, '0'),
(30, 'Havells 450', 1, 'Color : black\r\nSize : L', 'common', 'fan', 20, 'daily needs', 3000, 0, '0'),
(31, 'Temple Necklace', 1, 'Color : black\r\nSize : S', 'female', 'jewellery', 30, 'fashion', 30000, 10, '0'),
(32, 'Sukkhi Jewellery', 1, 'Color : black\r\nSize : M', 'female', 'jewellery', 24, 'fashion', 40000, 0, '0'),
(33, 'Outlet Perfumes', 1, 'Color : black\r\nSize : M', 'male', 'fragrance', 50, 'fashion', 2000, 0, '0'),
(34, 'Flavor Fragrance', 1, 'Color : black\r\nSize : M', 'male', 'fragrance', 40, 'fashion', 3000, 0, '0'),
(35, 'Dheiva Polyester', 1, 'Color : black\r\nSize : M', 'male', 'bag', 35, 'fashion', 3000, 0, '0'),
(36, 'Quilted Camera Bag', 1, 'Color : black\r\nSize : M', 'female', 'bag', 55, 'fashion', 2000, 0, '0'),
(42, 'Asus Zenfone Max ZC550KL', 0, 'black', 'male', 'asus', 221, 'mobile phone', 222222, 44, '0'),
(44, 'nokia 1200', 1, 'black\r\nwhite', 'female', 'nokia', 89, 'mobile phone', 9090, 5, '0');

-- --------------------------------------------------------

--
-- Stand-in structure for view `productinfo`
-- (See below for the actual view)
--
CREATE TABLE `productinfo` (
`pid` int(11)
,`name` varchar(200)
,`rating` decimal(10,0)
,`quantity` int(10)
,`specification` varchar(500)
,`price` int(10)
,`discount` int(50)
,`current_price` decimal(61,0)
,`type` varchar(20)
,`catagory` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `productinfoshopkeeper`
-- (See below for the actual view)
--
CREATE TABLE `productinfoshopkeeper` (
`pid` int(11)
,`name` varchar(200)
,`quantity` int(10)
,`specification` varchar(500)
,`catagory` varchar(50)
,`price` int(10)
,`discount` int(50)
,`current_price` decimal(61,0)
);

-- --------------------------------------------------------

--
-- Table structure for table `purchase_request`
--

CREATE TABLE `purchase_request` (
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

CREATE TABLE `search` (
  `value` varchar(100) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `search`
--

INSERT INTO `search` (`value`, `userid`) VALUES
('Mobile Phone', 0),
('Electronics', 0),
('hp', 0),
('nokia', 0),
('health care', 0),
('camera', 0),
('Electronics', 0),
('asus zenbook 13', 0),
('Electronics', 0),
('ips', 0),
('Entertainments', 2),
('Entertainments', 2),
('Daily Needs', 2),
('Daily Needs', 2),
('Daily Needs', 2),
('Computer', 2),
('camera', 2),
('camera', 2),
('camera', 2),
('hp', 2),
('hp', 2),
('hp', 2),
('hp', 2),
('hp', 2),
('nokia', 2),
('Mobile Phone', 2),
('Computer', 2),
('Mobile Phone', 2),
('Entertainments', 2),
('asus', 0),
('tv', 0),
('tv', 0),
('nokia', 10),
('camera', 10),
('Entertainments', 10),
('nokia', 10),
('nokia', 10),
('camera', 10),
('Mobile Phone', 0),
('refrigerator', 0),
('sound system', 0),
('sound system', 0),
('health care', 0),
('lighting', 0),
('Fashion', 0),
('jewellery', 0),
('fragrance', 0),
('bag', 0),
('nokia', 0),
('mobile', 0),
('nokia', 0),
('Flavor Fragrance', 0),
('j p', 0),
('Flavor Fragrance', 0),
('Flavor Fragrance', 0),
('Mobile Phone', 0),
('Mobile Phone', 10),
('Nikon D3400', 0),
('camera', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `name`, `email`, `password`, `type`, `contact_number`, `gender`, `address`, `status`) VALUES
(1, 'Noman saler', 's@s.com', '1111', 'saler', '', 'male', '', 1),
(10, 'jishnu saha', 'j@j.com', '111', 'customer', '01999999999', 'male', 'jkajdkfkj akjdfka', 1);

-- --------------------------------------------------------

--
-- Structure for view `cartinfo`
--
DROP TABLE IF EXISTS `cartinfo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cartinfo`  AS  select `cart`.`productid` AS `productid`,`cart`.`quantity` AS `quantity`,`cart`.`customerid` AS `customerid`,`cart`.`status` AS `status`,`cart`.`id` AS `id`,`productinfo`.`name` AS `name`,`productinfo`.`current_price` AS `unit_price`,(`productinfo`.`current_price` * `cart`.`quantity`) AS `total_price`,`productinfo`.`quantity` AS `maxQuantity` from (`cart` join `productinfo`) where (`productinfo`.`pid` = `cart`.`productid`) ;

-- --------------------------------------------------------

--
-- Structure for view `cartinfoshopkeeper`
--
DROP TABLE IF EXISTS `cartinfoshopkeeper`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cartinfoshopkeeper`  AS  select `cart`.`productid` AS `productid`,`cart`.`quantity` AS `quantity`,`cart`.`customerid` AS `customerid`,`cart`.`status` AS `status`,`cart`.`id` AS `id`,`productinfoshopkeeper`.`name` AS `name`,`productinfoshopkeeper`.`current_price` AS `unit_price`,`productinfoshopkeeper`.`quantity` AS `product_quantity`,`productinfoshopkeeper`.`catagory` AS `catagory`,`productinfoshopkeeper`.`specification` AS `specification` from (`cart` join `productinfoshopkeeper`) where ((`productinfoshopkeeper`.`pid` = `cart`.`productid`) and (`cart`.`status` = 'ordered')) ;

-- --------------------------------------------------------

--
-- Structure for view `productinfo`
--
DROP TABLE IF EXISTS `productinfo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productinfo`  AS  select `product`.`pid` AS `pid`,`product`.`name` AS `name`,`product`.`rating` AS `rating`,`product`.`quantity` AS `quantity`,`product`.`specification` AS `specification`,`product`.`price` AS `price`,`product`.`discount` AS `discount`,round((`product`.`price` - ((`product`.`price` * `product`.`discount`) / 100)),0) AS `current_price`,`product`.`type` AS `type`,`product`.`catagory` AS `catagory` from `product` ;

-- --------------------------------------------------------

--
-- Structure for view `productinfoshopkeeper`
--
DROP TABLE IF EXISTS `productinfoshopkeeper`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `productinfoshopkeeper`  AS  select `product`.`pid` AS `pid`,`product`.`name` AS `name`,`product`.`quantity` AS `quantity`,`product`.`specification` AS `specification`,`product`.`catagory` AS `catagory`,`product`.`price` AS `price`,`product`.`discount` AS `discount`,round((`product`.`price` - ((`product`.`price` * `product`.`discount`) / 100)),0) AS `current_price` from `product` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
