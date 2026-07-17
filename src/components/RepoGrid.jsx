import RepoCard from "./RepoCard.jsx";

export default function RepoGrid({ repos, status }) {
  if (status === "loading") {
    return <p className="status">Loading repositories…</p>;
  }

  if (status !== "loaded") {
    return <p className="status">{status}</p>;
  }

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
