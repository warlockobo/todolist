class Storage {
    constructor() {
        this.storageKey = 'todoAppData';
    }

    saveData(data) {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(this.storageKey, jsonData);
            return true;
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
            return false;
        }
    }

    loadData() {
        try {
            const jsonData = localStorage.getItem(this.storageKey);
            if (jsonData) {
                return JSON.parse(jsonData);
            }
            return null;
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return null;
        }
    }

    clearData() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Error clearing data from localStorage:', error);
            return false;
        }
    }
}

export default Storage; 