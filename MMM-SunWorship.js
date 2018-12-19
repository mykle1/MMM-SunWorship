/* Magic Mirror
 * Module: MMM-SunWorship
 *
 * By Mykle1
 * MIT Licensed.
 */
Module.register("MMM-SunWorship", {
    // Default module config.
    defaults: {
        maxWidth: "100%", // Adjusts size of images. Retains aspect ratio.
        updateInterval: 30 * 60 * 1000, // 30 minutes. set in config.js
        animationSpeed: 3000,
    },

    start: function() {
        var getTimeStamp = new Date().toISOString();
        this.url = "https://legacy.helioviewer.org/api/v1/takeScreenshot/?imageScale=2.4204409&layers=[SDO,AIA,AIA,304,1,100]&events=&eventLabels=true&scale=true&scaleType=earth&scaleX=0&scaleY=0&date=" + getTimeStamp + "&x1=-929.2475775696686&x2=106.70112763033143&y1=-970.7984919973343&y2=486.3069298026657&display=true&watermark=true&events=[CH,all,1]";

        // ADDED: Schedule update timer
        var self = this;
        setInterval(function() {
            self.updateDom(self.config.animationSpeed || 0); // use config.animationSpeed or revert to zero
        }, this.config.updateInterval);

    },

    getStyles: function() {
        return ["MMM-SunWorship.css"]
    },

    // Override dom generator.
    getDom: function() {

        var getTimeStamp = new Date().toISOString();

        var wrapper = document.createElement("div");
        var image = document.createElement("img");
        image.src = this.url + getTimeStamp;
        image.className = "photo";
        image.style.maxWidth = this.config.maxWidth;
        wrapper.appendChild(image);

				// local time
				var localTime = document.createElement("div");
				localTime.classList.add("small", "bright", "localTime");
				localTime.innerHTML = new Date(); //.local;
				wrapper.appendChild(localTime);

        return wrapper;
    },


    /////  Add this function to the modules you want to control with Hello-Lucy //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_WORSHIP') {
            this.hide();
        } else if (notification === 'SHOW_WORSHIP') {
            this.show(1000);
        }

    },

});
