function browserHistory(obj, array) {
    function clearAll() {
        openTabs = [];
        recentlyClosed = [];
        browserLogs = [];
    }

    function print() {
        console.log(browserName);
        console.log('Open Tabs: ' + openTabs.join(', '));
        console.log('Recently Closed: ' + recentlyClosed.join(', '));
        console.log('Browser Logs: ' + browserLogs.join(', '));
    }

    let browserName = obj['Browser Name'];
    let openTabs = obj['Open Tabs'];
    let recentlyClosed = obj['Recently Closed'];
    let browserLogs = obj['Browser Logs'];

    for (const log of array) {
        let [action, site] = log.split(' ');

        if (action === 'Open') {
            openTabs.push(site);
            browserLogs.push(log);
        }
        if (action === 'Close' && openTabs.includes(site)) {
            openTabs = openTabs.filter((t) => t !== site);
            recentlyClosed.push(site);
            browserLogs.push(log);
        }
        if (log === 'Clear History and Cache') {
            clearAll();
        }
    }

    print();
}
