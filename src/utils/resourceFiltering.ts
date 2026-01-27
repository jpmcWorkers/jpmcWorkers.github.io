export function initTagFiltering(): void {
  document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.tag-filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    const showingCount = document.getElementById('showing-count');

    filterButtons.forEach((button) => {
      button.addEventListener('click', function (event) {
        const target = event.currentTarget as HTMLElement;
        const selectedTag = target.getAttribute('data-tag');

        if (!selectedTag) return;

        // Update active button
        filterButtons.forEach((btn) => {
          btn.classList.remove('active', 'bg-jpmc-blue', 'text-white');
          btn.classList.add('text-jpmc-blue');
        });
        target.classList.add('active', 'bg-jpmc-blue', 'text-white');
        target.classList.remove('text-jpmc-blue');

        // Filter cards
        let visibleCount = 0;
        resourceCards.forEach((card) => {
          const cardTags = card.getAttribute('data-tags')?.split(',') || [];

          if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
            (card as HTMLElement).style.display = 'block';
            visibleCount++;
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        });

        // Update count
        if (showingCount) {
          showingCount.textContent = visibleCount.toString();
        }
      });
    });
  });
}

