import RepoCard from "./RepoCard.jsx";

export default function RepoGrid({ repos }) {
  if (repos.length === 0) {
    return <p className="status">No repositories found.</p>;
  }

  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
