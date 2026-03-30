use loco_rs::cli;
use migration::Migrator;
use movie_mate_match_maker::app::App;

#[tokio::main]
async fn main() -> loco_rs::Result<()> {
    cli::main::<App, Migrator>().await
}
