async function githubUsers(){
    try {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
            throw new Error("Failed to fetch GitHub users");
        }

        const data = await response.json();
        const mainContainer = document.querySelector('.github-users');
        if (!mainContainer) {
            console.error('Container .github-users not found');
            return;
        }

        mainContainer.innerHTML = '';

        for(const user of data){
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');

            const img = document.createElement('img');
            img.src = user.avatar_url;
            img.alt = user.login;

            const userName = document.createElement('h2');
            userName.textContent = user.login;

            const anchor = document.createElement('a');
            anchor.href = user.html_url;
            anchor.textContent = 'Visit Profile';
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';

            userCard.append(img, userName, anchor);
            mainContainer.append(userCard);
        }
    } catch (error) {
        console.error('Failed to load GitHub users:', error);
    }
}

githubUsers();