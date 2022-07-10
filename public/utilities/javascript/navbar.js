const header_div = document.getElementById('header');

const header_content = `
    <nav class="navbar navbar-expand-xl navbar-light ">
    <a class="navbar-brand" href="/index.html">W. Ross White</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">About Ross</a>
                <div class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item text-center" href="/content/about-ross/about.html">Ross in Short</a>
                    <a class="dropdown-item text-center" href="/content/about-ross/writer.html">Ross as Writer</a>
                    <a class="dropdown-item text-center" href="/content/about-ross/developer.html">Ross as Developer</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-center" href="/content/about-ross/support.html">Support Ross</a>
                </div>
            </li>
            <li class="nav-item dropdown justify-content-center">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">New Horizons
                </a>
                <div class="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/content/new-horizons/new-horizons-home.html">About New Horizons</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/content/new-horizons/01-chasing-stars/01-chasing-stars-home.html">Book One: Chasing Stars</a>
                    <a class="dropdown-item" href="/content/new-horizons/02-midway/02-midway-home.html">Book Two: Midway</a>
                    <a class="dropdown-item" href="/content/new-horizons/03-arrival/03-arrival-home.html">Book Three: Arrival</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/content/new-horizons/04-reunion/04-reunion-home.html">Book Four: Reunion</a>
                    <a class="dropdown-item" href="/content/new-horizons/05-contact/05-contact-home.html">Book Five: Contact</a>
                    <a class="dropdown-item" href="/content/new-horizons/06-resurrection/06-resurrection-home.html">Book Six: Resurrection</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/content/new-horizons/00-launch/00-launch-home.html">Book Zero: Launch</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">Dispatches from the Void</a>
                <div class="dropdown-menu w-100" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item text-center" href="/content/dispatches-from-the-void/updates-blog.html">Updates Blog</a>
                    <a class="dropdown-item text-center" href="/content/dispatches-from-the-void/short-stories.html">Short Stories</a>
                    <a class="dropdown-item text-center" href="/content/dispatches-from-the-void/travelogue.html">Travelogue</a>
                    <a class="dropdown-item text-center" href="/content/dispatches-from-the-void/fun-stuff.html">Just for Fun</a>
                </div>
            </li>
            <div class="nav-item">
                <a class="ml-onclick-form nav-link" href="javascript:void(0)" onclick="ml('show', '5UQDRD', true)">Subscribe</a>
            </div>
        </ul>
    </div>
    </nav>
`

header_div.innerHTML = header_content;