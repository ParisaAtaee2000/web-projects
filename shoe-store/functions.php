<?php
if (!defined('ABSPATH')) exit;

function sole_shoes_setup() {
    load_theme_textdomain('sole-shoes', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array('height'=>80,'width'=>260,'flex-height'=>true,'flex-width'=>true));
    add_theme_support('html5', array('search-form','comment-form','comment-list','gallery','caption','style','script'));
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    register_nav_menus(array('primary'=>'منوی اصلی'));
}
add_action('after_setup_theme','sole_shoes_setup');

function sole_shoes_assets() {
    wp_enqueue_style('sole-vazirmatn','https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&display=swap',array(),'1.0');
    wp_enqueue_style('sole-style',get_stylesheet_uri(),array('sole-vazirmatn'),'1.0.0');
    wp_enqueue_script('sole-theme',get_template_directory_uri().'/assets/js/theme.js',array(), '1.0.0', true);
    wp_localize_script('sole-theme','soleShop',array('ajaxUrl'=>admin_url('admin-ajax.php'),'cartUrl'=>function_exists('wc_get_cart_url')?wc_get_cart_url():'#','nonce'=>wp_create_nonce('sole_shop')));
}
add_action('wp_enqueue_scripts','sole_shoes_assets');

function sole_wc_wrapper_start(){ echo '<div class="sole-shell sole-woocommerce-wrap">'; }
function sole_wc_wrapper_end(){ echo '</div>'; }
add_action('woocommerce_before_main_content','sole_wc_wrapper_start',10);
add_action('woocommerce_after_main_content','sole_wc_wrapper_end',10);

function sole_add_to_cart_text(){ return 'افزودن به سبد خرید'; }
add_filter('woocommerce_product_add_to_cart_text','sole_add_to_cart_text');
add_filter('woocommerce_product_single_add_to_cart_text','sole_add_to_cart_text');

function sole_cart_count(){
    return function_exists('WC') && WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
}
function sole_header_cart(){
    $count=sole_cart_count();
    $url=function_exists('wc_get_cart_url')?wc_get_cart_url():home_url('/');
    echo '<a class="sole-icon" href="'.esc_url($url).'" aria-label="سبد خرید">🛒<span class="sole-cart-count">'.esc_html($count).'</span></a>';
}

function sole_excerpt_more(){ return '…'; }
add_filter('excerpt_more','sole_excerpt_more');

function sole_body_classes($classes){ $classes[]='sole-theme'; return $classes; }
add_filter('body_class','sole_body_classes');
