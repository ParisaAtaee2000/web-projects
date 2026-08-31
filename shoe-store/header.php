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
<div class="sole-topbar">کالکشن جدید پاییز ۱۴۰۵ · ارسال سریع سراسر کشور</div>
<header class="sole-shell sole-nav">
<a class="sole-logo" href="<?php echo esc_url(home_url('/')); ?>">SOLE<span>SHOES / STUDIO</span></a>
<nav class="sole-menu" aria-label="منوی اصلی">
<?php if(has_nav_menu('primary')): wp_nav_menu(array('theme_location'=>'primary','container'=>false,'items_wrap'=>'%3$s')); else: ?>
<a href="<?php echo esc_url(home_url('/')); ?>">خانه</a>
<a href="<?php echo esc_url(wc_get_page_permalink('shop')); ?>">فروشگاه</a>
<a href="<?php echo esc_url(home_url('/#new')); ?>">جدیدها</a>
<a href="<?php echo esc_url(home_url('/#collections')); ?>">کالکشن‌ها</a>
<a href="<?php echo esc_url(home_url('/#about')); ?>">درباره ما</a>
<?php endif; ?>
</nav>
<div class="sole-actions">
<?php if(function_exists('wc_get_cart_url')): ?>
<a class="sole-icon" href="<?php echo esc_url(wc_get_cart_url()); ?>" aria-label="سبد خرید">🛒</a>
<?php endif; ?>
<a class="sole-icon" href="<?php echo esc_url(wp_login_url()); ?>" aria-label="حساب کاربری">♙</a>
<a class="sole-icon" href="<?php echo esc_url(home_url('/?s=')); ?>" aria-label="جستجو">⌕</a>
</div>
</header>
