<?php get_header(); ?>
<main class="sole-shell sole-woocommerce-wrap">
<?php if(have_posts()): while(have_posts()): the_post(); ?>
<article <?php post_class('sole-card'); ?>><div class="sole-card-info"><h1 class="sole-page-title"><?php the_title(); ?></h1><?php the_content(); ?></div></article>
<?php endwhile; else: ?><p>محتوایی پیدا نشد.</p><?php endif; ?>
</main>
<?php get_footer(); ?>
