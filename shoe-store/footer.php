<?php if (!defined('ABSPATH')) exit; ?>
<footer class="footer"><div class="shell footer-grid"><div><a class="logo" href="<?php echo esc_url(home_url('/')); ?>">SOLE</a><p>فروشگاه کفش با تمرکز روی طراحی، راحتی و تجربه خرید متفاوت.</p></div><div><h3>فروشگاه</h3><a href="<?php echo esc_url(function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/')); ?>">همه محصولات</a><br><a href="<?php echo esc_url(home_url('/#collections')); ?>">کالکشن‌ها</a><br><a href="<?php echo esc_url(home_url('/#new')); ?>">جدیدها</a></div><div><h3>خدمات</h3><a href="#">راهنمای سایز</a><br><a href="#">شرایط ارسال</a><br><a href="#">بازگشت کالا</a></div><div><h3>ارتباط</h3><p>Instagram / Telegram<br>support@sole.example</p></div></div><div class="shell footer-bottom"><span>© <?php echo esc_html(date('Y')); ?> SOLE Studio</span><span>Designed as an interactive WordPress-ready demo</span></div></footer>
<?php wp_footer(); ?>
</body>
</html>
