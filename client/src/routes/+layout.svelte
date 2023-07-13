<script>
	import '../app.css';
	import Navbar from '../components/layout/navbar.svelte';
	import Footer from '../components/layout/footer.svelte';

</script>

<Navbar />
<div class="min-h-screen bg-background">
	<slot />
</div>
<Footer />
