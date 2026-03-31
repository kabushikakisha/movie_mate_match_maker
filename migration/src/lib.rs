#![allow(elided_lifetimes_in_paths)]
#![allow(clippy::wildcard_imports)]
pub use sea_orm_migration::prelude::*;
mod m20220101_000001_users;

mod m20260330_004146_movies;
mod m20260330_025957_ratings;
mod m20260330_031618_buddies;
pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_users::Migration),
            Box::new(m20260330_004146_movies::Migration),
            Box::new(m20260330_025957_ratings::Migration),
            Box::new(m20260330_031618_buddies::Migration),
            // inject-above (do not remove this comment)
        ]
    }
}