-- +goose up
CREATE TABLE verifications.key_verifications_per_day_v3
(
  time          DateTime,
  workspace_id  String,
  key_space_id  String,
  identity_id   String,
  key_id        String,
  outcome       LowCardinality(String),
  tags          Array(String),
  count         Int64
)
ENGINE = SummingMergeTree()
ORDER BY (workspace_id, key_space_id, identity_id, key_id, time, tags, outcome)
;


-- +goose down
DROP TABLE verifications.key_verifications_per_day_v3;
