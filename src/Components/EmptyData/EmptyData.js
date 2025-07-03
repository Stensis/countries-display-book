import Styles from "./EmptyData.module.css";

export function EmptyData() {
  return (
    <div className={Styles.emptyView}>
      <div>
        <div className={Styles.emoji}>🌍❌</div>
        <p className={Styles.message}>No countries match your search.</p>
        <p className={Styles.sub}>Try adjusting your filters or keywords.</p>
      </div>
    </div>
  );
}
