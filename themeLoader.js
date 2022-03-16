var currentTheme = window.theme;
var currentBodyChildren = document.body.children;
for (var currentIndex in currentBodyChildren) {
	var currentIndex2 = 0;
	if (currentBodyChildren[currentIndex].getAttribute("themed")) {
		var currentThemeds = currentBodyChildren[currentIndex].getAttribute("themed").split[","];
		while (currentIndex2.length > currentIndex2) {
			currentBodyChildren[currentIndex].style += currentThemeds[currentIndex2];
			currentIndex2 += 1;
		}
	}
}