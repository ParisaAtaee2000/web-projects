<?php if (!defined('ABSPATH')) exit; ?>
<!doctype html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div class="topbar">فروش آنلاین کفش مردانه · مدل‌های روزمره، اسپرت و رانینگ · مشاوره پیش از خرید</div>
<header class="shell nav"><a class="logo" href="<?php echo esc_url(home_url('/')); ?>">SOLE<span>SHOES / STUDIO</span></a><nav class="navlinks" aria-label="منوی اصلی"><a href="<?php echo esc_url(home_url('/')); ?>">خانه</a><a href="<?php echo esc_url(function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/')); ?>">فروشگاه کفش</a><a href="<?php echo esc_url(home_url('/#new')); ?>">کالکشن جدید</a><a href="<?php echo esc_url(home_url('/#collections')); ?>">دسته‌بندی‌ها</a><a href="<?php echo esc_url(home_url('/#about')); ?>">درباره ما</a></nav><div class="navactions"><a class="iconbtn" href="<?php echo esc_url(function_exists('wc_get_cart_url') ? wc_get_cart_url() : home_url('/')); ?>" aria-label="سبد خرید">🛒</a><a class="iconbtn" href="<?php echo esc_url(function_exists('wc_get_account_endpoint_url') ? wc_get_account_endpoint_url('dashboard') : wp_login_url()); ?>" aria-label="حساب کاربری">♙</a><a class="iconbtn" href="<?php echo esc_url(home_url('/?s=')); ?>" aria-label="جستجوی محصولات">⌕</a></div></header>
